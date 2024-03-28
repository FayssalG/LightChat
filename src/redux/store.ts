import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UiReducer from './features/UiSlice';
import AuthReducer from './features/AuthSlice';
import FriendReducer from './features/Friend/FriendSlice';
import ModalReducer from "./features/ModalSlice";
import ConversationReducer from "./features/Conversation/ConversationSlice";
import FriendRequestReducer from "./features/FriendRequest/FriendRequestSlice";
import BlockReducer from './features/Block/BlockSlice';

import rootSaga from './sagas';

const conversationPersistConfig = {
    key:'conversation',
    storage,
    blacklist : ['messages','activeConversationId' , 'status','error'] 
}

const friendPersistConfig = {
    key:'friend',
    storage,
    blacklist : ['status','error'] 
}

const authPersistConfig = {
    key:'auth',
    storage,
    whitelist : ['isAuth' , 'isVerified'] 
}

const saga = createSagaMiddleware()
const store = configureStore({
    reducer : {
        ui : UiReducer,
        auth : persistReducer(authPersistConfig, AuthReducer),
        friend : persistReducer(friendPersistConfig,FriendReducer),
        friendRequest : FriendRequestReducer,
        block : BlockReducer,
        conversation : persistReducer(conversationPersistConfig ,ConversationReducer),
        modal : ModalReducer,
    },

    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(saga)
})

saga.run(rootSaga)

export const persistor = persistStore(store);
export default store;