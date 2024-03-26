import { fetchBlockedUsersSuccess , fetchBlockedUsersFailure , blockUserSuccess,blockUserFailure, unBlockUserSuccess , unBlockUserFailure } from "./BlockSlice";

import { block_user, get_blocked_users, unblock_user } from "@/axios/friend";
import { call, put, takeEvery } from "redux-saga/effects";
import { setFriendAsBlocked, setFriendAsUnblocked } from "../Friend/FriendSlice";

function* workFetchBlockedUsers(){
    try{
        const response = yield call(get_blocked_users);
        yield put(fetchBlockedUsersSuccess([...response.data]));
    }catch(err){
        yield put(fetchBlockedUsersFailure(err.message));
        
    }
}

function* workBlockUser(action){
    const {username , user_id} = action.payload
    try{
        const response = yield call(block_user , username);
        yield put(blockUserSuccess(response.data));
        yield put(setFriendAsBlocked(user_id))
    }catch(err){
        yield put(blockUserFailure(err.message));
        
    }
}


function* workUnBlockUser(action){
    const { username , user_id } = action.payload
    try{
        const response = yield call(unblock_user , username);
        yield put(unBlockUserSuccess(username));
        yield put(setFriendAsUnblocked(user_id));
    }catch(err){
        yield put(unBlockUserFailure(err.message));
        
    }
}

export function* blockSaga(){
    yield takeEvery('block/fetchBlockedUsers' , workFetchBlockedUsers);
    yield takeEvery('block/blockUser' , workBlockUser);
    yield takeEvery('block/unBlockUser' , workUnBlockUser);

}
