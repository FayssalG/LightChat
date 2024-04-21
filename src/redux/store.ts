import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UiReducer from './features/UiSlice';
import authReducer from './features/auth/authSlice';
import FriendReducer from './features/friend/FriendSlice';
import ModalReducer from "./features/ModalSlice";
import ConversationReducer from "./features/Conversation/ConversationSlice";
import FriendRequestReducer from "./features/friendRequest/friendRequestSlice";
import BlockReducer from './features/block/blockSlice';

import rootSaga from './sagas';
import { authApi } from './features/auth/authApi';
import { friendApi } from './features/friend/friendApi';
import { baseApi } from './features/baseApi';

const conversationPersistConfig = {
    key:'conversation',
    storage,
    whitelist : ['openConversationsIds'] 
}

// const friendPersistConfig = {
//     key:'friend',
//     storage,
//     blacklist : ['status','error'] 
// }

const authPersistConfig = {
    key:'auth',
    storage,
    whitelist : ['token' , 'isVerified'] 
}

const saga = createSagaMiddleware()
const store = configureStore({
    reducer : {
        ui : UiReducer,
        auth : persistReducer(authPersistConfig, authReducer),
        [baseApi.reducerPath] : baseApi.reducer,
        friend : FriendReducer,
        friendRequest : FriendRequestReducer,
        block : BlockReducer,
        conversation : persistReducer(conversationPersistConfig, ConversationReducer),
        modal : ModalReducer,
    },

    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(baseApi.middleware)
})

// saga.run(rootSaga)

export const persistor = persistStore(store);
export default store;