import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import UiReducer from './features/UiSlice';
import AuthReducer from './features/AuthSlice';
import FriendReducer from './features/FriendSlice';
import ModalReducer from "./features/ModalSlice";
import ConversationReducer from "./features/ConversationSlice";

const conversationPersistConfig = {
    key:'conversation',
    storage,
    whitelist : ['openConversations'] 
}
const authPersistConfig = {
    key:'auth',
    storage,
    whitelist : ['isAuth' , 'isVerified'] 
}

const store = configureStore({
    reducer : {
        ui : UiReducer,
        auth : persistReducer(authPersistConfig, AuthReducer),
        friend : FriendReducer,
        conversation : persistReducer(conversationPersistConfig,ConversationReducer),
        modal : ModalReducer
    }
})

export const persistor = persistStore(store);
export default store;