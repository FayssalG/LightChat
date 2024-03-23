import { get_friend_requests, get_friends } from "@/axios/friend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchFriends = createAsyncThunk('friend/fetchFriends', async () =>{
    try{
        const response = await get_friends();
        return [...response.data];
    }catch(err){
        return err.message;
    }
})


const fetchRequests = createAsyncThunk('friend/fetchRequests', async () =>{
    try{
        const response = await get_friend_requests();
        return [...response.data];
    }catch(err){
        return err.message;
    }
})

const FriendSlice = createSlice({
    name : 'friend',
    initialState : {
        status : 'idle',
        error : null,
        isLoadingFriend : false,
        selectedFriend : null,
        friends : [],
        requests : [],
        blockedUsers: [],
    },
    reducers: {
        setIsLoadingFriend : (state , action)=>{
            state.isLoadingFriend=action.payload;
        },
        setSelectedFriend : (state , action)=>{
            state.selectedFriend=action.payload;
        },
        setFriends : (state , action)=>{
            state.friends = action.payload;
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
 

        setRequests : (state , action)=>{
            if(state.requests.find((request : FriendRequest)=>request.request_id == action.payload) ) return
            state.requests = action.payload
        },
        addRequest : (state , action)=>{
            state.requests.push(action.payload)
        },
        removeRequest : (state , action)=>{
            state.requests = state.requests.filter((item:FriendRequest)=>{
                return item.request_id != action.payload
            })
        },


        setBlockedUsers: (state , action)=>{
            state.blockedUsers = action.payload
        },
        addBlockedUser : (state , action)=>{
            state.blockedUsers.push(action.payload);
        },
        removeBlockedUser : (state , action)=>{
            state.blockedUsers = state.blockedUsers.filter((blocked : BlockedUser)=>{
                return blocked.block_id != action.payload;
            })
        }
    },

    extraReducers(builder) {
        builder.addCase(fetchFriends.fulfilled , (state ,action)=>{
            state.status = 'succeeded';
            state.friends = action.payload;
        })
        builder.addCase(fetchFriends.pending , (state ,action)=>{
            state.status = 'loading'
        })
        builder.addCase(fetchFriends.rejected , (state ,action)=>{
            state.status = 'failed';
            state.error = action.payload;
        })
    }

})


export default FriendSlice.reducer;
export const {setIsLoadingFriend, setSelectedFriend, setFriends  ,addFriend , removeFriend ,setRequests , addRequest, removeRequest , setBlockedUsers,removeBlockedUser,addBlockedUser} = FriendSlice.actions;  