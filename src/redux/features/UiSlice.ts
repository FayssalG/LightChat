import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        visibleSection : 'friends',
        conversationVisibility : false,
        showEditModal : false, 
        showFriendDetailsModal:false,
        showGroupDetailsModal : false,
        showAddFriendModal : false,
        showConfirmRemoveFriendModal : false,
        showConfirmBlockFriendModal : false,
        showCreateGroupModal : false,
    },
    reducers: {
        changeVisibleSection : (state , action)=>{
            state.visibleSection = action.payload;
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

        openGroupDetailsModal : (state)=>{
            state.showGroupDetailsModal = true;
        },
        closeGroupDetailsModal : (state)=>{
            state.showGroupDetailsModal = false;
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
        
        openCreateGroupModal : (state)=>{
            state.showCreateGroupModal = true
        },
        closeCreateGroupModal : (state)=>{
            state.showCreateGroupModal = false
        }
    }
})

export default UiSlice.reducer;
export const {
    changeVisibleSection , 
    toggleConversationVisibility , 
    toggleShowEditModal,
    
    openFriendDetailsModal,
    closeFriendDetailsModal,
    
    openAddFriendModal,
    closeAddFriendModal,

    openConfirmRemoveFriendModal,
    closeConfirmRemoveFriendModal,

    openConfirmBlockFriendModal,
    closeConfirmBlockFriendModal,

    openCreateGroupModal,
    closeCreateGroupModal,

    openGroupDetailsModal,
    closeGroupDetailsModal

} = UiSlice.actions;
