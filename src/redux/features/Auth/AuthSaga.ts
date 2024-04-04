import { call, put, takeEvery } from "redux-saga/effects";
import { fetchUserSuccess , fetchUserFailed } from "./AuthSlice";
import { getUser } from "@/axios/axios";

function* workFetchUser(){
    try {
        const response = yield call(getUser);
        yield put(fetchUserSuccess(response.data))
    }catch(err){
        yield put(fetchUserFailed(err.message))
    }
}

export default function* authSaga(){
    yield takeEvery('auth/fetchUser' , workFetchUser)
} 