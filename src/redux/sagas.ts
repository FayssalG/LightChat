import { all, fork } from 'redux-saga/effects';
import { friendRequestSaga } from './features/FriendRequest/FriendRequestSaga';
import { blockSaga } from './features/Block/BlockSaga';
import friendSaga from './features/Friend/FriendSaga';
import conversationSaga from './features/Conversation/ConversationSaga';
import friendConversationSaga from './features/FriendConversation/FriendConversationSaga';


const rootSaga = function*(){
    yield all([
        fork(friendRequestSaga),
        fork(blockSaga),
        fork(friendSaga),
        fork(conversationSaga),
        fork(friendConversationSaga)
    ])
}

export default rootSaga