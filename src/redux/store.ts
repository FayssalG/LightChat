import { configureStore } from "@reduxjs/toolkit";
import UiReducer from './features/UiSlice';
import AuthReducer from './features/AuthSlice';
import FriendReducer from './features/FriendSlice';

const store = configureStore({
    reducer : {
        ui : UiReducer,
        auth : AuthReducer,
        friend : FriendReducer,
    }
})

export default store;