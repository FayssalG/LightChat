import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    name : 'ui',
    initialState : {
        globalLoading : false,
        activeSection : 'friends',

        notificationBadges : {
            pending : false,
            friends : false,
            blocked : false,

            groups : false,
            conversations : false 
        }

    },
    reducers: {
        setGlobalLoading : (state , action)=>{
            state.globalLoading = action.payload;
        },

        changeActiveSection : (state , action)=>{
            state.activeSection = action.payload;
        },

        showBadge :  (state , action)=>{
            type  BadgeType = 'friendRequests'|'friends'|'groups'|'conversations' 
            const badge :  BadgeType = action.payload;
            state.notificationBadges = {...state.notificationBadges , [badge]:true};
        },
        hideBadge :  (state , action)=>{
            type  BadgeType = 'pending'|'friends'|'blocked'|'groups'|'conversations' 
            const badge : BadgeType = action.payload;
            state.notificationBadges = {...state.notificationBadges , [badge]:false};
        }       

    }
})

export default UiSlice.reducer;
export const {
    setGlobalLoading,
    changeActiveSection , 
    showBadge,
    hideBadge
    
} = UiSlice.actions;
