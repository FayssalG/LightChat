import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { conversationApi } from "./conversationApi";

interface IConversationState{
    error : string | null,
    status : 'idle' | 'loading' | 'succeeded'  | 'failed',
    conversations : [Conversation?],
    activeConversationId : string | null,
    openConversationsIds : [string?],
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
    openConversationsIds : []
})

const ConversationSlice = createSlice({
    name : 'conversation',
    initialState ,
    reducers: {
        setActiveConversation : (state,action )=>{
            state.activeConversationId = action.payload        
        },
        openConversation : (state , action)=>{
          
            conversationsAdapter.updateOne(state,  {
                id: action.payload,
                changes : {
                    isOpen : true
                }
            });
            
            if(!state.openConversationsIds.includes(action.payload)){
                state.openConversationsIds.push(action.payload);
            }

        },


        closeConversation : (state ,action)=>{
            const conversationId = action.payload;
            if(conversationId == state.activeConversationId){
                state.activeConversationId = null;
            }
            conversationsAdapter.updateOne(state, {
                id: conversationId,
                changes : {
                    isOpen : false
                }
            });
            
            state.openConversationsIds = state.openConversationsIds.filter(id=>id!=conversationId)
        },

    },
})




export default ConversationSlice.reducer;

export const {
    setActiveConversation,
    closeConversation , 
    openConversation ,
} = ConversationSlice.actions;  