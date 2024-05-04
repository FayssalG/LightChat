import { createSlice } from "@reduxjs/toolkit";

interface IConversationState{
    openConversationsIds : [string?],
}  


const initialState : IConversationState = {
    openConversationsIds : []
}

const ConversationSlice = createSlice({
    name : 'conversation',
    initialState ,
    reducers: {
        openConversation : (state , action)=>{
                      
            if(!state.openConversationsIds.includes(action.payload)){
                state.openConversationsIds.push(action.payload);
            }

        },


        closeConversation : (state ,action)=>{
            const conversationId = action.payload;
            
            state.openConversationsIds = state.openConversationsIds.filter(id=>id!=conversationId)
        },

    },
})




export default ConversationSlice.reducer;

export const {
    closeConversation , 
    openConversation ,
} = ConversationSlice.actions;  