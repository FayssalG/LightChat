import { configureStore } from "@reduxjs/toolkit";
import UiReducer from './features/UiSlice';
import AuthReducer from './features/AuthSlice';
import FriendReducer from './features/FriendSlice';
import ModalSlice from "./features/ModalSlice";

const store = configureStore({
    reducer : {
        ui : UiReducer,
        auth : AuthReducer,
        friend : FriendReducer,
        modal : ModalSlice
    }
})

export default store;