import { call, put, take, takeEvery } from "redux-saga/effects";
import { fetchUserSuccess , fetchUserFailure, loginUserSuccess, loginUserFailure, registerUserSuccess, registerUserFailure, passwordForgotSuccess, passwordForgotFailure, passwordResetFailure, passwordResetSuccess, logoutUserSuccess } from "./AuthSlice";
import { forgot, getUser, login, logout, register, reset } from "@/axios/axios";
import { openPasswordResetSuccessAlert } from "../UiSlice";
import { clearBlockedUsers } from "../Block/BlockSlice";
import { clearConversations } from "../Conversation/ConversationSlice";
import { clearFriends } from "../Friend/FriendSlice";
import { clearRequests } from "../FriendRequest/FriendRequestSlice";

function* workFetchUser(){

    try {
        const response = yield call(getUser);
        yield put(fetchUserSuccess(response.data))
    }catch(err){
        yield put(fetchUserFailure(err.message))
    }
}

function* workLoginUser(action){
    console.log('TESTING HERE' , action)
    const {email , password} = action.payload
    try {
        const response = yield call(login , email , password);
        yield put(loginUserSuccess())
    }catch(err){
        yield put(loginUserFailure(err.response.data.message))
    }
}

function* workRegisterUser(action){
    const {email , displayName , username , password , passwordConfirmation} = action.payload
    try {
        const response = yield call(register , email , displayName , username , password , passwordConfirmation);
        yield put(registerUserSuccess())
    }catch(err){
        yield put(registerUserFailure(err.response.data.errors))
    }
}


function* workPasswordForgot(action){
    const {email} = action.payload
    if(!email){
        yield put(passwordForgotFailure('Type your Email'))
        return
    } 
    try {
        const response = yield call(forgot , email);
        yield put(passwordForgotSuccess())
    }catch(err){

        yield put(passwordForgotFailure(err.response.data.message))
    }
}

function* workPasswordReset(action){
    const {token,email,password,passwordConfirmation} = action.payload
    try {
        const response = yield call(reset , token,email,password,passwordConfirmation);
        if(response?.status == 200){
            console.log(action.payload)
            console.log({RESOONSSTATUS:response})
            yield put(openPasswordResetSuccessAlert())
            yield put(passwordResetSuccess())
        }
    }catch(err){
        yield put(passwordResetFailure(err.response.data.errors.password))
    }
}


function* workLogoutUser(){
    try {
        const response = yield call(logout);
        yield put(logoutUserSuccess())
        yield put(clearRequests())
        yield put(clearFriends())
        yield put(clearConversations())
        yield put(clearBlockedUsers())
    }catch(err){
        yield put(loginUserFailure(err.message))
    }
}


export default function* authSaga(){
    yield takeEvery('auth/fetchUser' , workFetchUser)
    
    //When loginUser is successfull we fetch the user
    yield takeEvery('auth/loginUser' , workLoginUser)
    yield takeEvery('auth/loginUserSuccess' , workFetchUser)

    //When RegisterUser is successfull we fetch the user
    yield takeEvery('auth/registerUser' , workRegisterUser)
    yield takeEvery('auth/registerUserSuccess' , workFetchUser)
   
    yield takeEvery('auth/passwordForgot' , workPasswordForgot)
    yield takeEvery('auth/passwordReset' , workPasswordReset)
    yield takeEvery('auth/logoutUser' , workLogoutUser)

    
} 