import { createSelector } from "@reduxjs/toolkit";
import { conversationsAdapter , messagesAdapter } from "./ConversationSlice";

export const {
    selectAll : selectAllConversations,
    selectById : selectConversationById,
} = conversationsAdapter.getSelectors(state=>state.conversation);

export const selectOpenConversations = createSelector([selectAllConversations] , (Allconversations)=>{
    return Allconversations.filter((conversation)=>conversation.isOpen);

})

export const selectActiveConversation = (state)=>{
    return selectConversationById(state , state.conversation.activeConversationId)     
}

export const {
    selectAll : seletctAllMessages,
    selectById : selectMessageById    
} = messagesAdapter.getSelectors(state=>state.conversation.messages);

export const selectMessagesByConversationId = (conversationId)=>{
    return createSelector([seletctAllMessages] , (allMessages)=>{
        return allMessages.filter(({conversation_id})=>conversation_id==conversationId);
    })
}