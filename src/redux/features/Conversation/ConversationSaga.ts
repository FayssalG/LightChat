import { call, put, takeEvery } from "redux-saga/effects";
import {  fetchConversationsSuccess , fetchConversationsFailure, sendMessageSuccess, sendMessageFailure, addMessage, removeMessage } from "./ConversationSlice";
import { get_conversations, send_message } from "@/axios/conversation";

function* workFetchConversations(){
    try{
        const response = yield call(get_conversations);
        // const conversations = response.data.reduce((prev , friend)=>{
        //     return [...prev,{conversation_id:friend.conversation.conversation_id, friend_id:friend.user_id, isOpen:false  , messagesIds :friend.conversation.messages.reduce((prev,{id})=>[...prev,id] ,[]) }]
        // } , []);

        // const messages = response.data.map((friend)=>{
        //     return friend.conversation.messages.map((message)=>{
        //          return message; 
        //     })
        // }).flat();

        yield put(fetchConversationsSuccess([...response.data]))
    }catch(err){
        yield put(fetchConversationsFailure(err.message))
    }
}

function* workSendMessage(action){
    yield put(addMessage(action.payload));
    try{
        const {receiver_id , text} = action.payload
        const response = yield call(send_message , receiver_id , text);
        console.log({response})
        yield put(sendMessageSuccess(response.data))
    }catch(err){
        yield put(removeMessage(action.payload));
        yield put(sendMessageFailure(err.message))
    }
}

export default function* conversationSaga(){
    yield takeEvery('conversation/fetchConversations' , workFetchConversations);
    yield takeEvery('conversation/sendMessage' , workSendMessage);
}