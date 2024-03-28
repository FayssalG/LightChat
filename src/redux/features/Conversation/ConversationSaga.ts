import { call, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import {  fetchConversationsSuccess , fetchConversationsFailure, fetchUnseenMessagesSuccess,fetchUnseenMessagesFailure, sendMessageSuccess, sendMessageFailure, addMessageOptimistic, addMessageRevert, markMessagesSeenSuccess, fetchMessagesSuccess, fetchMessagesFailure } from "./ConversationSlice";
import { get_conversations, get_messages, messages_seen, send_message, send_message_attachment } from "@/axios/conversation";

function* workFetchConversations(){
    try{
        const response = yield call(get_conversations);
        
        const conversations = response.data.map((conversation)=>{
            return {conversation_id:conversation.conversation_id, friend_id:conversation.friend_id, isOpen:false}
        } );

        
        yield put(fetchConversationsSuccess({conversations}))

    }catch(err){
        yield put(fetchConversationsFailure(err.message))
    }
}


function* workFetchMessages(){
    try{
        const response = yield call(get_messages);
        console.log({RESPONSE:response.data})
        const messages = response.data

        yield put(fetchMessagesSuccess(messages))

    }catch(err){
        yield put(fetchMessagesFailure(err.message))
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

function* workSendMessageWithAttachment(action){
    const oldMessage = action.payload;
    const newAttachment = {
        type:oldMessage.attachment.type, 
        name:oldMessage.attachment.name,
        url:URL.createObjectURL(oldMessage.attachment)
    }
    yield put(addMessageOptimistic({...oldMessage , attachment:newAttachment}));
    try{
        const {receiver_id , text , attachment} = action.payload
        const response = yield call(send_message_attachment , receiver_id , attachment,text );
        console.log({RESPONSE:response.data})
        const newMessage = response.data;
        yield put(sendMessageSuccess({oldMessageId:oldMessage.id , newMessage }))
    }catch(err){
        console.log(err)
        yield put(addMessageRevert(oldMessage.id));
        yield put(sendMessageFailure(err.message))
    }
}


function* workMarkMessagesSeen(action){
    const conveersationId  = action.payload
    try{
        yield call(messages_seen,conveersationId);
        yield put(markMessagesSeenSuccess(conveersationId));
    }catch(err){
        console.log(err)
    }
}



export default function* conversationSaga(){
    yield takeEvery('conversation/fetchConversations' , workFetchConversations);
    yield takeEvery('conversation/fetchMessages' , workFetchMessages);
    yield takeEvery('conversation/sendMessage' , workSendMessage);
    yield takeEvery('conversation/sendMessageWithAttachment' , workSendMessageWithAttachment);
    yield takeEvery('conversation/markMessagesSeen' , workMarkMessagesSeen);
}