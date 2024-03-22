import { createSlice } from "@reduxjs/toolkit";

interface IConversationState{
    conversations : [Conversation?],
    openConversations : [string?], 
    activeConversation : Conversation | null
}  

const initialState : IConversationState = {
    conversations : [],
    activeConversation : null,
    openConversations : JSON.parse(localStorage.getItem('neoChat-open-conversations')) || []
}
const ConversationSlice = createSlice({
    name : 'conversation',

    initialState ,

    reducers: {
        setConversations : (state ,action)=>{
            state.conversations = action.payload
        },
        setActiveConversation : (state , action)=>{
            const newConversation = action.payload
            const existingConversation = state.conversations.find((conversation)=>conversation?.conversationWith.user_id == newConversation.conversationWith.user_id);
            if(existingConversation){
                state.activeConversation = existingConversation
            }else{
                state.activeConversation = newConversation
                state.conversations.push(newConversation)
            }

            if(!state.openConversations.includes(state.activeConversation.conversation_id)){
                state.openConversations.push(state.activeConversation.conversation_id)
                localStorage.setItem('neoChat-open-conversations' , JSON.stringify(state.openConversations));
            }
            
        },

        closeConversation : (state ,action)=>{
            const conversationId = action.payload;
            state.openConversations = state.openConversations.filter((id)=>{
                return id != conversationId
            });
            localStorage.setItem('neoChat-open-conversations' , JSON.stringify(state.openConversations));
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
                if(existingConversation?.conversationWith.user_id == state.activeConversation?.conversationWith.user_id){
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
                state.activeConversation = newConversation
                state.conversations.push(newConversation)
            }
        }
    }
})


export default ConversationSlice.reducer;
export const {setConversations , closeConversation , setActiveConversation , addSentMessage , addReceivedMessage} = ConversationSlice.actions;  