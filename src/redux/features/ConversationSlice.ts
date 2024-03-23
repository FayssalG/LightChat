import { get_conversations } from "@/axios/conversation";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

interface IConversationState{
    error : string | null,
    status : 'idle' | 'loading' | 'succeeded'  | 'failed',
    conversations : [Conversation?],
    openConversationsByFriendId : [string?], 
    activeConversation : Conversation | null
}  


export const fetchConversations = createAsyncThunk('conversation/fetchConversations',async ()=>{
    try{
        const response = await get_conversations();
        return [...response.data];
    }catch(err){
        return err.message;
    }
})



const selecConversations = state=>state.conversation.conversations;
const selectOpenIds = state=>state.conversation.openConversationsByFriendId;

export const  selectOpenConversations = createSelector([selecConversations , selectOpenIds],(conversations ,openConversations)=>{
    return conversations.filter((conv)=>{
        return openConversations.includes(conv.conversationWith.user_id) 
    })
})


const initialState : IConversationState = {
    error : null,
    status : 'idle' ,
    conversations : [],
    activeConversation : null,
    openConversationsByFriendId : []
}

const ConversationSlice = createSlice({
    name : 'conversation',
    initialState ,
    reducers: {
        setConversations : (state ,action)=>{
            state.conversations = action.payload
        },
        openConversation : (state , action)=>{
            const friend = action.payload
            const newConversation : Conversation = {
                conversationWith : {
                  user_id:friend.user_id,
                  display_name : friend.display_name,
                  username : friend.username,
                  friendship_id : friend.friendship_id,  
                  image : friend.image
                } ,
                messages : [],
            }
          
            const existingConversation = state.conversations.find((conversation)=>conversation?.conversationWith.user_id == newConversation.conversationWith.user_id);
            if(existingConversation){
                const withFriend = existingConversation.conversationWith;
                state.activeConversation = existingConversation
                if(!state.openConversationsByFriendId.includes(withFriend.user_id)){
                    state.openConversationsByFriendId.push(withFriend.user_id);
                }
    
            }else{
                state.activeConversation = newConversation
                const withFriend = newConversation.conversationWith;
                state.conversations.push(newConversation)
                state.openConversationsByFriendId.push(withFriend.user_id)
            }
            
        },
        selectConversation : (state , action)=>{
            state.activeConversation = action.payload
        },
        closeConversation : (state ,action)=>{
            const friendId = action.payload;
            state.activeConversation = null;
            state.openConversationsByFriendId = state.openConversationsByFriendId.filter((id)=>{
                return id != friendId
            });
        },


        addSentMessage : (state , action)=>{
            if(!state.activeConversation) return 
            const newMessage  = action.payload            
            state.activeConversation.messages.push(newMessage)
            state.conversations.forEach((conversation)=>{
                if(conversation && conversation.conversation_id == newMessage.conversation_id){
                    conversation.messages.push(newMessage)
                }                    
            })
        },

        addReceivedMessage : (state , action)=>{
            const {newMessage , senderInfos}  = action.payload
            const existingConversation = state.conversations.find((conversation)=>{
                return newMessage?.sender_id == conversation?.conversationWith.user_id
            })             

            console.log({conversations:state.conversations})
            console.log({newMessage})
            if(existingConversation){
                const withFriend = existingConversation.conversationWith
                
                const isOpen = state.openConversationsByFriendId.includes(withFriend.user_id) 
                if(!isOpen){
                    state.openConversationsByFriendId.push(withFriend.user_id)
                }

                const isActive = withFriend.user_id == state.activeConversation?.conversationWith.user_id;
                if(isActive){
                    state.activeConversation?.messages.push(newMessage);
                }
    
                state.conversations.forEach(conversation => {
                    if(conversation && conversation.conversationWith.user_id == senderInfos.user_id){
                        conversation.messages.push(newMessage)
                    }
                });
               
            }
            else{
                const newConversation : Conversation = {
                    conversation_id : newMessage.conversation_id,
                    conversationWith : {
                        friendship_id : senderInfos.friendship_id,
                        user_id : senderInfos.sender_id,
                        username :senderInfos.username,
                        display_name :senderInfos.display_name,
                        image : senderInfos.image,
                    },
                    messages : [newMessage]
                }
                state.conversations.push(newConversation)
                state.openConversationsByFriendId.push(senderInfos.user_id)
            }
        }
    },
    extraReducers(builder) {
      builder.addCase(fetchConversations.pending , (state , action)=>{
        state.status = "loading";
      })
      builder.addCase(fetchConversations.fulfilled , (state , action)=>{
        state.status = 'succeeded';
        state.conversations = action.payload;
      })
      builder.addCase(fetchConversations.rejected , (state , action)=>{
        state.status = 'failed';
        state.error = action.payload;
      })
      
      
    }
})


export default ConversationSlice.reducer;
export const {
    setConversations , 
    selectConversation,
    closeConversation , 
    openConversation , 
    addSentMessage , 
    addReceivedMessage
} = ConversationSlice.actions;  