import { get_friends, remove_friend } from "@/axios/friend";
import { fetchFriendsSuccess , fetchFriendsFailure , unFriendSuccess , unFriendFailure} from "./FriendSlice";
import { call, put, takeEvery } from "redux-saga/effects";
import { deleteConversation, deleteRealtimeConversation } from "../Conversation/ConversationSlice";


function* workFetchFriends(){
    try{
        const response	= yield call(get_friends);
        const friends = response.data.reduce((prev , friend)=>{
            return [...prev , {friendship_id:friend.friendship_id, display_name:friend.display_name,username:friend.username,image:friend.image,user_id:friend.user_id,conversation_id:friend.conversation.conversation_id}]
        } , [])

        yield put(fetchFriendsSuccess(friends))
    }catch(err){
        yield put(fetchFriendsFailure(err.message))
    }
}


function* workUnFriend(action){
    try{
        const friendshipId = action.payload.friendship_id
        const friendId = action.payload.user_id
        const response	= yield call(remove_friend , friendshipId);
        const conversationId = action.payload.conversation_id;
        yield put(deleteRealtimeConversation(conversationId))
        yield put(unFriendSuccess(friendId))
    }catch(err){
        yield put(unFriendFailure(err.message))
    }
}

export default function* friendSaga(){
    yield takeEvery('friend/fetchFriends' , workFetchFriends);
    yield takeEvery('friend/unFriend' , workUnFriend);
}