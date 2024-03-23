import { all, fork } from 'redux-saga/effects';
import { friendRequestSaga } from './features/FriendRequest/FriendRequestSaga';
import { blockSaga } from './features/Block/BlockSaga';
import friendSaga from './features/Friend/FriendSaga';


const rootSaga = function*(){
    yield all([
        fork(friendRequestSaga),
        fork(blockSaga),
        fork(friendSaga)
    ])
}

export default rootSaga