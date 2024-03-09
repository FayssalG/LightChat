import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        activeSection : 'friends',
        conversationVisibility : false,
        showEditModal : false, 
        showFriendDetailsModal:false,
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
        },

        openFriendDetailsModal : (state )=>{
            state.showFriendDetailsModal = true;
        },
        closeFriendDetailsModal : (state )=>{
            state.showFriendDetailsModal = false;
        }
    
        
    }
})

export default UiSlice.reducer;
export const {
    changeActiveSection , 
    toggleConversationVisibility , 
    toggleShowEditModal,
    openFriendDetailsModal,
    closeFriendDetailsModal
} = UiSlice.actions;
