import { get_friend_requests, get_friends } from "@/axios/friend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// export const fetchFriends = createAsyncThunk('friend/fetchFriends', async () =>{
//     try{
//         const response = await get_friends();
//         return [...response.data];
//     }catch(err){
//         return err.message;
//     }
// })


const FriendSlice = createSlice({
    name : 'friend',
    initialState : {
        status : 'idle',
        error : null,
        friends : [],
    },
    reducers: {
        fetchFriends : (state)=>{
            state.status = 'loading';
            state.error = null
        },

        fetchFriendsSuccess : (state,action)=>{
            state.status = 'succeeded';
            state.friends = action.payload
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
            state.status = 'succeeded';
            state.friends = state.friends.filter((friend : Friend)=>{
                return friend.friendship_id != action.payload;
            })           
            state.error = null
        },

        unFriendFailure : (state,action)=>{
            state.status = 'failed';
            state.error = action.payload
        },
        
        
        
        addFriend : (state , action)=>{
            const existingFriend = state.friends.find((friend)=>friend.friendship_id == action.payload.friendship_id);
            if(!existingFriend){
                state.friends.push(action.payload);
            }
        },
        removeFriend:(state,action) =>{
            state.friends = state.friends.filter((friend : Friend)=>{
                return friend.friendship_id != action.payload;
            })           
        },
 

    },
})


export default FriendSlice.reducer;
export const { addFriend , removeFriend , fetchFriends , fetchFriendsFailure , fetchFriendsSuccess , unFriend , unFriendFailure , unFriendSuccess} = FriendSlice.actions;  
