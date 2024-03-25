import { call, put, takeEvery } from "redux-saga/effects";
import {  fetchConversationsSuccess , fetchConversationsFailure, sendMessageSuccess, sendMessageFailure, addMessage, removeMessage, addMessageOptimistic, addMessageRevert } from "./ConversationSlice";
import { get_conversations, send_message } from "@/axios/conversation";
import { get_friends } from "@/axios/friend";

function* workFetchConversations(){
    try{
        const response = yield call(get_conversations);
        
        const conversations = response.data.map((conversation)=>{
            return {conversation_id:conversation.conversation_id, friend_id:conversation.friend_id, isOpen:false  , messagesIds :conversation.messages.reduce((prev,{id})=>[...prev,id] ,[]) }
        } );

        const messages = response.data.map((conversation)=>{
            return conversation.messages.map((message)=>{
                 return message; 
            })
        }).flat();
    
        yield put(fetchConversationsSuccess({conversations , messages}))

    }catch(err){
        yield put(fetchConversationsFailure(err.message))
    }
}

function* workSendMessage(action){
    const oldMessage = action.payload;
    yield put(addMessageOptimistic(oldMessage));
    
    try{
        const {receiver_id , text} = action.payload
        const response = yield call(send_message , receiver_id , text);
        const newMessage = response.data;
        yield put(sendMessageSuccess({oldMessageId:oldMessage.id , newMessage }))
    }catch(err){
        console.log(err)
        yield put(addMessageRevert(oldMessage.id));
        yield put(sendMessageFailure(err.message))
    }
}

export default function* conversationSaga(){
    yield takeEvery('conversation/fetchConversations' , workFetchConversations);
    yield takeEvery('conversation/sendMessage' , workSendMessage);
}