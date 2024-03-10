import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        activeSection : 'friends',
        conversationVisibility : false,
        showEditModal : false, 
        showFriendDetailsModal:false,
        showAddFriendModal : false,
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
        },

        openAddFriendModal : (state)=>{
            state.showAddFriendModal = true
        },
        closeAddFriendModal : (state)=>{
            state.showAddFriendModal = false
        },
    
        
    }
})

export default UiSlice.reducer;
export const {
    changeActiveSection , 
    toggleConversationVisibility , 
    toggleShowEditModal,
    
    openFriendDetailsModal,
    closeFriendDetailsModal,
    
    openAddFriendModal,
    closeAddFriendModal
} = UiSlice.actions;
