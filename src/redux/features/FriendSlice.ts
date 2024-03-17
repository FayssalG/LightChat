import { createSlice } from "@reduxjs/toolkit";


const FriendSlice = createSlice({
    name : 'friend',
    initialState : {
        friends : [],
        pendingFriends : []
    },
    reducers: {
        setFriends : (state , action)=>{
            state.friends = action.payload;
        },
        addFriend : (state , action)=>{
            state.friends = [...state.friends , action.payload];
        },
        setPendingFriends : (state , action)=>{
            state.pendingFriends = action.payload
        }
    }
})

export default FriendSlice.reducer;
export const {setFriends , setPendingFriends ,addFriend} = FriendSlice.actions;  