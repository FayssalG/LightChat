import { get_conversations } from "@/axios/conversation";
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { friendsAdapter , messagesAdapter , conversationsAdapter , removeOneMessageById , addOneMessage } from "./FriendConversationsAdapters";

// interface IConversationState{
//     error : string | null,
//     status : 'idle' | 'loading' | 'succeeded'  | 'failed',
//     conversations : [Conversation?],
//     openConversationsIds : [string?], 
//     activeConversationId : string | null
// }  




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

        unFriend : (state,action)=>{
            state.status = 'loading';
            state.error = null
        },

        unFriendSuccess : (state,action)=>{
            state.status = 'succeeded';
            friendsAdapter.removeOne(state , action.payload);
            state.error = null
        },

        unFriendFailure : (state,action)=>{
            state.status = 'failed';
            state.error = action.payload
        },
        
        addFriend : (state , action)=>{
            friendsAdapter.upsertOne(state , action.payload)
        },
        removeFriend:(state,action) =>{
            friendsAdapter.removeOne(state , action.payload)
        },


        sendMessage:(state , action)=>{
            state.status = 'loading';
        },
        
        sendMessageSuccess:(state , action)=>{
            state.status = 'succeeded';
            const {newMessage , oldMessageId}  = action.payload;

            removeOneMessageById(state,oldMessageId);
            addOneMessage(state,newMessage)
        },
        
        sendMessageFailure:(state , action)=>{
            state.status = 'failed';
            state.error = action.payload; 
        },
        addMessageOptimistic:(state,action)=>{
            const message = action.payload 
            addOneMessage(state,message)
        },
        addMessageRevert:(state,action)=>{
            removeOneMessageById(state,action);
        },

        openConversation : (state , action)=>{       
            state.activeConversationId = action.payload
            conversationsAdapter.updateOne(state.conversations,  {
                id: action.payload,
                changes : {
                    isOpen : true
                }
            });
        },
      
        setActiveConversation : (state , action)=>{
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
            const {newMessage }  = action.payload
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
    selectById : selectConversationById,
} = conversationsAdapter.getSelectors(state=>state.friendConversation.conversations);

export const selectOpenConversations = createSelector([selectAllConversations] , (Allconversations)=>{
    return Allconversations.filter((conversation)=>conversation.isOpen);
})

export const selectActiveConversation = (state)=>{
    return selectConversationById(state , state.friendConversation.activeConversationId)     
}

export const {
    selectAll : seletctAllFriends,
    selectById:selectFriendById,
} = friendsAdapter.getSelectors(state=>state.friendConversation);



export const {
    selectAll : seletctAllMessages,
    selectById : selectMessageById    
} = messagesAdapter.getSelectors(state=>state.friendConversation.messages);


export const {
    fetchFriendConversations,
    fetchFriendConversationsSuccess,
    fetchFriendConversationsFailure,

    sendMessage,
    sendMessageSuccess,
    sendMessageFailure,
    addMessageOptimistic,
    addMessageRevert,

    setActiveConversation,
    closeConversation , 
    openConversation , 
    addReceivedMessage
} = FriendConversation.actions;  