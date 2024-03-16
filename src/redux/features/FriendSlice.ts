import { createSlice } from "@reduxjs/toolkit";


const FriendSlice = createSlice({
    name : 'friend',
    initialState : {
        friends : []
    },
    reducers: {
        setFriends : (state , action)=>{
            state.friends = action.payload;
        },
        addFriend : (state , action)=>{
            state.friends = [...state.friends , action.payload];
        }
    }
})

export default FriendSlice.reducer;
export const {setFriends ,addFriend} = FriendSlice.actions;  