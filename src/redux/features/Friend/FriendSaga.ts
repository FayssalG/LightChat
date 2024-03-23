import { get_friends, remove_friend } from "@/axios/friend";
import { fetchFriendsSuccess , fetchFriendsFailure , unFriendSuccess , unFriendFailure} from "./FriendSlice";
import { call, put, takeEvery } from "redux-saga/effects";


function* workFetchFriends(){
    try{
        const response	= yield call(get_friends);
        yield put(fetchFriendsSuccess([...response.data]))
    }catch(err){
        yield put(fetchFriendsFailure(err.message))
    }
}


function* workUnFriend(action){
    try{
        const response	= yield call(remove_friend , action.payload);
        yield put(unFriendSuccess(action.payload))
    }catch(err){
        yield put(unFriendFailure(err.message))
    }
}

export default function* friendSaga(){
    yield takeEvery('friend/fetchFriends' , workFetchFriends);
    yield takeEvery('friend/unFriend' , workUnFriend);
}