import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        activeSection : 'friends',
        conversationVisibility : false,
        showEditModal : false, 
    },
    reducers: {
        changeActiveSection : (state , action)=>{
            state.activeSection = action.payload;
        },
        toggleConversationVisibility : (state )=>{
            state.conversationVisibility = !state.conversationVisibility;
        },

        toggleShowEditModal : (state )=>{
            state.showEditModal = !state.showEditModal;
        }
        
    }
})

export default UiSlice.reducer;
export const {changeActiveSection , toggleConversationVisibility , toggleShowEditModal} = UiSlice.actions;
