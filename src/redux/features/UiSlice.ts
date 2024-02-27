import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        activeSection : 'friends',
        activeConversation : 'test'
    },
    reducers: {
        changeActiveSection : (state , action)=>{
            state.activeSection = action.payload;
        },
        changeActiveConversation : (state , action)=>{
            state.activeConversation = action.payload;
        }
    }
})

export default UiSlice.reducer;
export const {changeActiveSection , changeActiveConversation} = UiSlice.actions;
