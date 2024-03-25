import { get_friend_requests, get_friends } from "@/axios/friend";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";


// export const fetchFriends = createAsyncThunk('friend/fetchFriends', async () =>{
//     try{
//         const response = await get_friends();
//         return [...response.data];
//     }catch(err){
//         return err.message;
//     }
// })


const friendsAdapter = createEntityAdapter({
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

        fetchFriends : (state)=>{
            state.status = 'loading';
            state.error = null
        },
        fetchFriendsSuccess : (state,action)=>{
            state.status = 'succeeded';
            friendsAdapter.setAll(state  ,action.payload);
            state.error = null
        },

        fetchFriendsFailure : (state,action)=>{
            state.status = 'failed';
            state.error = action.payload
        },
        
        unFriend : (state,action)=>{
            state.status = 'loading';
            state.error = null
        },

        unFriendSuccess : (state,action)=>{
            const friendId = action.payload
            state.status = 'succeeded';
            friendsAdapter.removeOne(state , friendId);
            state.error = null
        },

        unFriendFailure : (state,action)=>{
            state.status = 'failed';
            state.error = action.payload
        },
        
        
        
        addFriend : (state , action)=>{
            friendsAdapter.upsertOne(state , action.payload);
        },
        removeFriend:(state,action) =>{
            friendsAdapter.removeOne(state , action.payload)
        },

    },
})


export const {
    selectAll : seletctAllFriends,
    selectById:selectFriendById,
} = friendsAdapter.getSelectors(state=>state.friend);


export default FriendSlice.reducer;
export const { addFriend , removeFriend , fetchFriends , fetchFriendsFailure , fetchFriendsSuccess , unFriend , unFriendFailure , unFriendSuccess} = FriendSlice.actions;  
