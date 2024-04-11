import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { friendApi } from "./friendApi";




export	const friendsAdapter = createEntityAdapter({
    selectId:(friend)=>friend.user_id
})

const initialState = friendsAdapter.getInitialState({
    error : null,
    status : 'idle' ,
})

const FriendSlice = createSlice({
    name : 'friend',
    initialState,
    reducers: {


    },
})


export const {
    selectAll : seletctAllFriends,
    selectById:selectFriendById,
} = friendsAdapter.getSelectors(state=>state.friend);

export const selectAccessibleFriends =  createSelector([seletctAllFriends],(AllFriends)=>{
    return AllFriends.filter((friend)=>friend.isFriend);
})

export const selectFriendByUsername = (username:string) => createSelector([seletctAllFriends],(AllFriends)=>{
    return AllFriends.find((friend)=>friend.username == username);
 })

export default FriendSlice.reducer;
export const {} = FriendSlice.actions;  
