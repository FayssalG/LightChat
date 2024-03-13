import { configureStore } from "@reduxjs/toolkit";
import UiReducer from './features/UiSlice';
import AuthReducer from './features/AuthSlice';

const store = configureStore({
    reducer : {
        ui : UiReducer,
        auth : AuthReducer
    }
})

export default store;