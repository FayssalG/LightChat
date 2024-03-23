import { fetchBlockedUsersSuccess , fetchBlockedUsersFailure , blockUserSuccess,blockUserFailure, unBlockUserSuccess , unBlockUserFailure } from "./BlockSlice";

import { block_user, get_blocked_users, unblock_user } from "@/axios/friend";
import { call, put, takeEvery } from "redux-saga/effects";

function* workFetchBlockedUsers(){
    try{
        const response = yield call(get_blocked_users);
        yield put(fetchBlockedUsersSuccess([...response.data]));
    }catch(err){
        yield put(fetchBlockedUsersFailure(err.message));
        
    }
}

function* workBlockUser(action){
    try{
        const response = yield call(block_user , action.payload);
        yield put(blockUserSuccess(response.data));
    }catch(err){
        yield put(blockUserFailure(err.message));
        
    }
}


function* workUnBlockUser(action){
    try{
        const response = yield call(unblock_user , action.payload);
        yield put(unBlockUserSuccess(action.payload));
    }catch(err){
        yield put(unBlockUserFailure(err.message));
        
    }
}

export function* blockSaga(){
    yield takeEvery('block/fetchBlockedUsers' , workFetchBlockedUsers);
    yield takeEvery('block/blockUser' , workBlockUser);
    yield takeEvery('block/unBlockUser' , workUnBlockUser);

}
