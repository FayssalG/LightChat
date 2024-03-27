import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

interface IConversationState{
    error : string | null,
    status : 'idle' | 'loading' | 'succeeded'  | 'failed',
    conversations : [Conversation?],
    activeConversationId : string | null
}  


export const removeOneMessageById = (state , messageId)=>{
    const {conversation_id} = messagesAdapter
    .getSelectors()
    .selectById(state.messages,messageId);

    //getting the conversation where the message belongs
    const conversation = conversationsAdapter.getSelectors()
    .selectById(state ,  conversation_id);

    //removing the message by its id from the messages state
    messagesAdapter.removeOne(state.messages , messageId);
    
    //removing the messagei id from messages.ids in the conversation
    conversationsAdapter.updateOne( state , {
        id : conversation_id ,
        changes : { messagesIds : conversation.messagesIds.filter((id)=>id !== messageId)}
    });
}


export const addOneMessage = (state , message)=>{
    const {conversation_id} = message
    //getting the conversation where the message belongs
    const conversation = conversationsAdapter.getSelectors()
    .selectById(state,  conversation_id);
    console.log({conversation , message})

    //updating the messages state
    messagesAdapter.addOne(state.messages , {
        id:message.id,
        ...message
    });
    
    //pushing the message id to messagesIds in the conversation
    conversationsAdapter.updateOne( state, {
        id : conversation_id ,
        changes : { messagesIds : [...conversation.messagesIds,message.id]}
    });
    
}

export const conversationsAdapter  = createEntityAdapter({
    selectId : (conversation)=>conversation.conversation_id
})

export const messagesAdapter = createEntityAdapter()


const initialState = conversationsAdapter.getInitialState({
    error : null,
    status : 'idle' ,
    messages : messagesAdapter.getInitialState(),
    activeConversationId : null,
})

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
            const {messages , conversations} = action.payload
            conversationsAdapter.setAll(state, conversations) ;
            messagesAdapter.setAll(state.messages ,messages);
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
            const {newMessage , oldMessageId}  = action.payload;
            removeOneMessageById(state,oldMessageId);
            addOneMessage(state,{...newMessage , isSent:true})
        },
        
        sendMessageFailure:(state , action)=>{
            state.status = 'failed';
            state.error = action.payload; 
        },

        
        sendMessageWithAttachment:(state , action)=>{
            state.status = 'loading';
        },
        
        sendMessageWithAttachmentSuccess:(state , action)=>{
            state.status = 'succeeded';
            const {newMessage , oldMessageId}  = action.payload;
            removeOneMessageById(state,oldMessageId);
            addOneMessage(state,{...newMessage , isSent:true})
        },
        
        sendMessageWithAttachmentFailure:(state , action)=>{
            state.status = 'failed';
            state.error = action.payload; 
        },


        markMessagesSeen : (state,action)=>{
 
        },
        markMessagesSeenSuccess : (state,action)=>{
            const conversationId  = action.payload ; 
            const allMessages = messagesAdapter.getSelectors().selectAll(state.messages);
            messagesAdapter.setAll(state.messages, allMessages.map((msg)=>{
                if(conversationId == msg.conversation_id){
                    return {...msg , isSeen:true}
                }
                return msg
            }))

        },
        markMessagesSeenFailure : (state,action)=>{

        },
    

        addMessageOptimistic:(state,action)=>{
            const message = action.payload;
            console.log({message})
            addOneMessage(state,message)
        },
        addMessageRevert:(state,action)=>{
            const messageId = action.payload;
            removeOneMessageById(state,messageId);
        },


        

        openConversation : (state , action)=>{
            conversationsAdapter.updateOne(state,  {
                id: action.payload,
                changes : {
                    isOpen : true
                }
            });
            state.activeConversationId = action.payload        

        },

        setActiveConversation : (state , action)=>{
            state.activeConversationId = action.payload        
        },

        closeConversation : (state ,action)=>{
            const conversationId = action.payload;
            state.activeConversationId = null;
            conversationsAdapter.updateOne(state, {
                id: conversationId,
                changes : {
                    isOpen : false
                }
            });
        },

        deleteRealtimeConversation : (state,action)=>{
            const conversationId = action.payload
            conversationsAdapter.removeOne(state , conversationId)
        },


        addRealtimeMessage : (state , action)=>{
            const {newMessage}  = action.payload
            conversationsAdapter.updateOne(state, {
                id:newMessage.conversation_id,
                changes :{
                    isOpen : true,
                }
            })
            addOneMessage(state,newMessage)
        },

        setRealtimeMessagesSeen : (state , action)=>{
            const {conversationId , myUserId} = action.payload ; 

            const allMessages = messagesAdapter.getSelectors().selectAll(state.messages);
            messagesAdapter.setAll(state.messages, allMessages.map((msg)=>{
                if(conversationId == msg.conversation_id && msg.sender_id == myUserId){
                    return {...msg , isSeen:true}
                }
                return msg
            }))
        }

    },
})




export default ConversationSlice.reducer;

export const {
    fetchConversations,
    fetchConversationsSuccess,
    fetchConversationsFailure,

    sendMessage,
    sendMessageWithAttachment,
    sendMessageSuccess,
    sendMessageFailure,

    markMessagesSeen,
    markMessagesSeenSuccess,
    markMessagesSeenFailure,
    addMessageOptimistic,
    addMessageRevert,
    addRealtimeMessage,
    setRealtimeMessagesSeen,

    setActiveConversation,
    closeConversation , 
    openConversation ,
    deleteRealtimeConversation,
} = ConversationSlice.actions;  