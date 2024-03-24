import { call, put, takeEvery } from "redux-saga/effects";
import {  fetchFriendConversationsSuccess , fetchFriendConversationsFailure, sendMessageSuccess, sendMessageFailure, addMessage, removeMessage } from "./FriendConversationSlice";
import { get_conversations, send_message } from "@/axios/conversation";
import { get_friends } from "@/axios/friend";

function* workFetchFriendConversations(){
    try{
        const response = yield call(get_friends);
       
        const friends = response.data.reduce((prev , friend)=>{
            return [...prev , {display_name:friend.display_name,username:friend.username,image:friend.image,user_id:friend.user_id,conversation_id:friend.conversation.conversation_id}]
        } , [])

        const conversations = response.data.reduce((prev , friend)=>{
            return [...prev,{...friend.conversation, friend_id:friend.user_id, isOpen:false  , messages :friend.conversation.messages.reduce((prev,{id})=>[...prev,id] ,[]) }]
        } , []);

        const messages = response.data.map((friend)=>{
            return friend.conversation.messages.map((message)=>{
                 return message; 
            })
        }).flat();

        yield put(fetchFriendConversationsSuccess({friends,conversations,messages}))
    }catch(err){
        yield put(fetchFriendConversationsFailure(err.message))
    }
}

function* workSendMessage(action){
    yield put(addMessage(action.payload));
    try{
        const {receiver_id , text} = action.payload
        const response = yield call(send_message , receiver_id , text);
        const newMessageId = response.data.id;
        const oldMessageId = action.payload.id;
        yield put(sendMessageSuccess({oldMessageId , newMessageId}))
    }catch(err){
        yield put(removeMessage(action.payload));
        yield put(sendMessageFailure(err.message))
    }
}

export default function* friendConversationSaga(){
    yield takeEvery('friendConversation/fetchFriendConversations' , workFetchFriendConversations);
    yield takeEvery('friendConversation/sendMessage' , workSendMessage);
}