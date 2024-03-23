import { all, fork } from 'redux-saga/effects';
import { friendRequestSaga } from './features/FriendRequest/FriendRequestSaga';

const rootSaga = function*(){
    yield all([
        fork(friendRequestSaga),
    ])
}

export default rootSaga