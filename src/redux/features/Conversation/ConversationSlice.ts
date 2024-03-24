import { get_conversations } from "@/axios/conversation";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { randomUUID } from "crypto";

interface IConversationState{
    error : string | null,
    status : 'idle' | 'loading' | 'succeeded'  | 'failed',
    conversations : [Conversation?],
    openConversationsIds : [string?], 
    activeConversationId : string | null
}  


const selectConversations = state=>state.conversation.conversations;
const selectOpenIds = state=>state.conversation.openConversationsIds;
const selectActiveConversationId = state=>state.conversation.activeConversationId;

export const  selectOpenConversations = createSelector([selectConversations , selectOpenIds],(conversations ,openIds)=>{
    return conversations.filter((conv)=>{
        return openIds.includes(conv.conversation_id) 
    })
})

export const selectActiveConversation = createSelector([selectConversations,selectActiveConversationId] , (conversations,activeId)=>{
    return conversations.find((conv)=>{
        return conv.conversation_id == activeId
    })
})

const initialState : IConversationState = {
    error : null,
    status : 'idle' ,
    conversations : [],
    activeConversationId : null,
    openConversationsIds : []
}

const ConversationSlice = createSlice({
    name : 'conversation',
    initialState ,
    reducers: {

        fetchConversations : (state)=>{
            state.status = 'loading';
            state.error = null;
        },
        fetchConversationsSuccess : (state  , action)=>{
            state.status = 'succeeded';
            state.conversations = action.payload
            state.error = null;
        },
        fetchConversationsFailure : (state , action)=>{
            state.status = 'failed';
            state.error = action.payload;
        },

        sendMessage:(state , action)=>{
            state.status = 'loading';
        },
        
        sendMessageSuccess:(state , action)=>{
            state.status = 'succeeded';
            const newMessage  = action.payload;
            const conversations = state.conversations
            conversations.forEach((conversation)=>{
                if(conversation?.conversation_id == newMessage.conversation_id){
                    conversation?.messages.forEach((msg)=>{            
                        if(!msg.id){
                            console.log({conv:conversation?.conversation_id},{newMsg:newMessage.conversation_id})
                            msg.id = newMessage.id ;
                            msg.isSent = true; 
                        } 
                    })
                }                    
            })
        },
        
        sendMessageFailure:(state , action)=>{
            state.status = 'failed';
            state.error = action.payload; 
        },
          
        addMessage:(state,action)=>{
            const message = action.payload;
            state.conversations.forEach((conv)=>{
                if(conv?.conversation_id == message.conversation_id) {
                    conv?.messages.push({...message , isSent:false})
                }
            })
        },
        removeMessage:(state,action)=>{
            const message = action.payload;
            state.conversations.forEach((conv)=>{
                if(conv?.conversation_id == message.conversation_id) {
                    conv?.messages.pop();
                }
            })
        },




        openConversation : (state , action)=>{
            const friend = action.payload          
            state.conversations.forEach((conversation)=>{
                if(conversation?.conversationWith.user_id == friend.user_id){
                    state.activeConversationId = conversation?.conversation_id || null;            
                    if(!state.openConversationsIds.includes(conversation?.conversation_id)){
                        state.openConversationsIds.push(conversation?.conversation_id);
                    }
                }
            });
            
        },
      
        selectConversation : (state , action)=>{
            state.conversations.forEach((conv)=>{
                if(conv?.conversation_id == action.payload.conversation_id){
                    state.activeConversationId = conv?.conversation_id || null;
                }
            })
        },
      
        closeConversation : (state ,action)=>{
            const conversationId = action.payload;
            state.activeConversationId = null;
            state.openConversationsIds = state.openConversationsIds.filter((id)=>{
                return id != conversationId
            }) ;
        },



        addReceivedMessage : (state , action)=>{
            const {newMessage , senderInfos}  = action.payload
            const conversation = state.conversations.find((conversation)=>{
                return newMessage?.conversation_id == conversation?.conversation_id
            })             
            
            const isOpen = state.openConversationsIds.includes(conversation?.conversation_id) 
            if(!isOpen){
                state.openConversationsIds.push(conversation?.conversation_id)
            }            
            state.conversations.forEach(conversation => {
                if(conversation && conversation.conversationWith.user_id == senderInfos.user_id){
                    conversation.messages.push(newMessage)
                }
            });  
        }

    },
})


export default ConversationSlice.reducer;
export const {
    fetchConversations,
    fetchConversationsSuccess,
    fetchConversationsFailure,

    sendMessage,
    sendMessageSuccess,
    sendMessageFailure,
    addMessage,
    removeMessage,

    selectConversation,
    closeConversation , 
    openConversation , 
    addReceivedMessage
} = ConversationSlice.actions;  