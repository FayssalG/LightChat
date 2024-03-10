import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        activeSection : 'friends',
        conversationVisibility : false,
        showEditModal : false, 
        showFriendDetailsModal:false,
        showAddFriendModal : false,
        showConfirmRemoveFriendModal : false,
        showConfirmBlockFriendModal : false,
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
        
        openConfirmRemoveFriendModal: (state)=>{
            state.showConfirmRemoveFriendModal = true;
        },
        closeConfirmRemoveFriendModal: (state)=>{
            state.showConfirmRemoveFriendModal = false;
        },
        
        
        openConfirmBlockFriendModal: (state)=>{
            state.showConfirmBlockFriendModal = true;
        },
        closeConfirmBlockFriendModal: (state)=>{
            state.showConfirmBlockFriendModal = false;
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
    closeAddFriendModal,

    openConfirmRemoveFriendModal,
    closeConfirmRemoveFriendModal,

    openConfirmBlockFriendModal,
    closeConfirmBlockFriendModal

} = UiSlice.actions;
