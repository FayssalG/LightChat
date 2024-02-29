import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        activeSection : 'friends',
        conversationVisibility : false
    },
    reducers: {
        changeActiveSection : (state , action)=>{
            state.activeSection = action.payload;
        },
        toggleConversationVisibility : (state )=>{
            state.conversationVisibility = !state.conversationVisibility;
        }
    }
})

export default UiSlice.reducer;
export const {changeActiveSection , toggleConversationVisibility} = UiSlice.actions;
