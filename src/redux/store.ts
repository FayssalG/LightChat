import { configureStore } from "@reduxjs/toolkit";
import UiReducer from './features/UiSlice';

const store = configureStore({
    reducer : {
        ui : UiReducer
    }
})

export default store;