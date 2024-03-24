import { get_conversations } from "@/axios/conversation";
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { randomUUID } from "crypto";

// interface IConversationState{
//     error : string | null,
//     status : 'idle' | 'loading' | 'succeeded'  | 'failed',
//     conversations : [Conversation?],
//     openConversationsIds : [string?], 
//     activeConversationId : string | null
// }  


// const selectConversations = state=>state.conversation.conversations;
// const selectOpenIds = state=>state.conversation.openConversationsIds;
// const selectActiveConversationId = state=>state.conversation.activeConversationId;

// export const  selectOpenConversations = createSelector([selectConversations , selectOpenIds],(conversations ,openIds)=>{
//     return conversations.filter((conv)=>{
//         return openIds.includes(conv.conversation_id) 
//     })
// })

// export const selectActiveConversation = createSelector([selectConversations,selectActiveConversationId] , (conversations,activeId)=>{
//     return conversations.find((conv)=>{
//         return conv.conversation_id == activeId
//     })
// })


const friendsAdapter = createEntityAdapter({
    selectId : (friend)=>friend.user_id
})

const conversationsAdapter = createEntityAdapter({
    selectId : (conversation)=>conversation.conversation_id
})

const messagesAdapter = createEntityAdapter({
    selectId : (message )=>message.id
})




const initialState = friendsAdapter.getInitialState({
    error : null,
    status : 'idle' ,
    conversations : conversationsAdapter.getInitialState(),
    messages : messagesAdapter.getInitialState(),
    activeConversationId : null,
    openConversationsIds : []
})

const FriendConversation = createSlice({
    name : 'friendConversation',
    initialState ,
    reducers: {
        fetchFriendConversations : (state)=>{
            state.status = 'loading';
            state.error = null;
        },
        fetchFriendConversationsSuccess : (state  , action)=>{
            const {friends , conversations , messages} = action.payload
            console.log({friends,conversations,messages})

            state.status = 'succeeded';
            friendsAdapter.setAll(state , friends);
            conversationsAdapter.setAll(state.conversations, conversations) ;
            messagesAdapter.setAll(state.messages ,messages);
            state.error = null;
        },
        fetchFriendConversationsFailure : (state , action)=>{
            state.status = 'failed';
            state.error = action.payload;
        },

        sendMessage:(state , action)=>{
            state.status = 'loading';
        },
        
        sendMessageSuccess:(state , action)=>{
            state.status = 'succeeded';
            const {newMessageId , oldMessageId}  = action.payload;
            messagesAdapter.updateOne(state.messages , {
                id : oldMessageId,
                changes : {
                    id : newMessageId
                }
            } )

        },
        
        sendMessageFailure:(state , action)=>{
            state.status = 'failed';
            state.error = action.payload; 
        },
          
        addMessage:(state,action)=>{
            const message = action.payload;
            messagesAdapter.addOne(state.messages , {
                id : message.id,
                ...message,
            })            
        },
        removeMessage:(state,action)=>{
            const message = action.payload;
            messagesAdapter.removeOne(state.messages ,  message.id);
        },




        openConversation : (state , action)=>{
            const conversationId = action.payload          
            conversationsAdapter.updateOne(state.conversations,  {
                id: conversationId,
                changes : {
                    isOpen : true
                }
            });
            
        },
      
        selectConversation : (state , action)=>{
            state.activeConversationId = action.payload        
        },
      
        closeConversation : (state ,action)=>{
            const conversationId = action.payload;
            state.activeConversationId = null;
            conversationsAdapter.updateOne(state.conversations, {
                id: conversationId,
                changes : {
                    isOpen : false
                }
            });
        },

        addReceivedMessage : (state , action)=>{
            const {newMessage , senderInfos}  = action.payload
            conversationsAdapter.updateOne(state.conversations , {
                id:newMessage.conversation_id,
                changes :{
                    isOpen : true,
                }
            })
            messagesAdapter.addOne(state.messages , {
                id : newMessage.id,
                item : {...newMessage },
            })
        }

    },
})


export default FriendConversation.reducer;


export const {
    selectAll : selectAllConversations,
} = conversationsAdapter.getSelectors(state=>state.friendConversation.conversations);

const selectOpenConversations = createSelector([selectAllConversations] , (Allconversations)=>{
    return Allconversations.map((conversation)=>conversation.isOpen);
})

export const {
    selectAll : seletctAllFriends,
} = friendsAdapter.getSelectors(state=>state.friendConversation);

export const {
    selectAll : seletctAllMessages,
} = messagesAdapter.getSelectors(state=>state.friendConversation.messages);


export const {
    fetchFriendConversations,
    fetchFriendConversationsSuccess,
    fetchFriendConversationsFailure,

    sendMessage,
    sendMessageSuccess,
    sendMessageFailure,
    addMessage,
    removeMessage,

    selectConversation,
    closeConversation , 
    openConversation , 
    addReceivedMessage
} = FriendConversation.actions;  