import { call, takeEvery , put} from "redux-saga/effects";
import { accept_friend_request, cancel_friend_request, get_friend_requests,  ignore_friend_request,  send_friend_request } from "@/axios/friend";
import { fetchRequestsSuccess , fetchRequestsFailure , sendRequestFailure , sendRequestSuccess  , cancelIgnoreRequestFailure ,cancelIgnoreRequestSuccess, acceptRequestSuccess, acceptRequestFailure} from './FriendRequestSlice';
import { RealtimeAddFriend } from "../Friend/FriendSlice";
import { fetchConversations } from "../Conversation/ConversationSlice";

function* workGetRequests(){
    try{
        const response = yield call(get_friend_requests);
        yield put(fetchRequestsSuccess(response.data));
    
    }catch(err){
        yield put(fetchRequestsFailure(err.response.message));
    }
}
function* workSendRequest(action){
    try{
        const response = yield call(send_friend_request , action.payload);
        yield put(sendRequestSuccess(response.data));
    }catch(err){
        yield put(sendRequestFailure(err.response.data.errors[0]));
    }
}

function* workCancelRequest(action){
    try{
        const requestId = action.payload
        const response = yield call(cancel_friend_request , action.payload);
        yield put(cancelIgnoreRequestSuccess(requestId))
    }catch(err){
        yield put(cancelIgnoreRequestFailure(err.response.data.errors[0]));
    }
}

function* workIgnoreRequest(action){
    try{
        const requestId = action.payload;
        const response = yield call(ignore_friend_request , action.payload);
        yield put(cancelIgnoreRequestSuccess(requestId))
    }catch(err){
        yield put(cancelIgnoreRequestFailure(err.response.data.errors[0]));
    }
}

function* workAcceptRequest(action){
    try{
        const requestId = action.payload;
        const response = yield call(accept_friend_request , action.payload);
        yield put(acceptRequestSuccess(requestId))
        yield put(RealtimeAddFriend(response.data));
        yield put(fetchConversations());
    }catch(err){
        yield put(acceptRequestFailure(err.response.data.errors[0]));
    }
    
}

export function* friendRequestSaga(){
    yield takeEvery('friendRequest/fetchRequests' , workGetRequests);
    yield takeEvery('friendRequest/sendRequest' , workSendRequest);
    yield takeEvery('friendRequest/cancelRequest' , workCancelRequest);
    yield takeEvery('friendRequest/ignoreRequest' , workIgnoreRequest);

    yield takeEvery('friendRequest/acceptRequest' , workAcceptRequest);

}
