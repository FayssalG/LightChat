import { createEntityAdapter } from "@reduxjs/toolkit"

export const friendsAdapter = createEntityAdapter({
    selectId : (friend)=>friend.user_id
})

export const conversationsAdapter = createEntityAdapter({
    selectId : (conversation)=>conversation.conversation_id
})

export const messagesAdapter = createEntityAdapter({
    selectId : (message )=>message.id
})

export const removeOneMessageById = (state , messageId)=>{
    const {conversation_id} = messagesAdapter
    .getSelectors()
    .selectById(state.messages,messageId);

    //getting the conversation where the message belongs
    const conversation = conversationsAdapter.getSelectors()
    .selectById(state.conversations ,  conversation_id);

    //removing the message by its id from the messages state
    messagesAdapter.removeOne(state.messages , messageId);
    
    //removing the messagei id from messages.ids in the conversation
    conversationsAdapter.updateOne( state.conversations , {
        id : conversation_id ,
        changes : { messagesIds : conversation.messagesIds.filter((id)=>id !== messageId)}
    });
}

export const addOneMessage = (state , message)=>{
    const {conversation_id} = message
    
    //getting the conversation where the message belongs
    const conversation = conversationsAdapter.getSelectors()
    .selectById(state.conversations ,  conversation_id);

    //updating the messages state
    messagesAdapter.addOne(state.messages , {
        id:message.id,
        ...message
    });
    
    //pushing the message id to messagesIds in the conversation
    conversationsAdapter.updateOne( state.conversations , {
        id : conversation_id ,
        changes : { messagesIds : [...conversation.messagesIds,message.id]}
    });
    
}
