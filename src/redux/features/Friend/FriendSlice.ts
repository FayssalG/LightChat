import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";




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
            friendsAdapter.updateOne(state , {
                id:friendId,
                changes : {
                    isFriend : false
                }
            });
            state.error = null
        },

        unFriendFailure : (state,action)=>{
            state.status = 'failed';
            state.error = action.payload
        },

        setFriendAsBlocked : (state, action)=>{
            const friendId = action.payload;
            console.log({action})    
            friendsAdapter.updateOne(state,{
                id : friendId,
                changes : { isBlocked : true}
            });
        },
        
        setFriendAsUnblocked : (state, action)=>{
            const friendId = action.payload;
            console.log({action})    
            friendsAdapter.updateOne(state,{
                id : friendId,
                changes : {isBlocked : false}
            });
        },

        RealtimeAddFriend : (state , action)=>{
            friendsAdapter.upsertOne(state , {...action.payload,  isBlocked:false, isFriend:true });
        },
        
        RealtimeRemoveFriend:(state,action) =>{
            const friendshipId = action.payload;
            const friends = friendsAdapter.getSelectors().selectAll(state);
            const friendToRestrict : Friend = friends.find((friend)=>friend.friendship_id==friendshipId);

            friendsAdapter.updateOne(state , {
                id:friendToRestrict.user_id,
                changes : {
                    isFriend : false,
                }
            });
        },

    },
})


export const {
    selectAll : seletctAllFriends,
    selectById:selectFriendById,
} = friendsAdapter.getSelectors(state=>state.friend);

export const selectAccessibleFriends =  createSelector([seletctAllFriends],(AllFriends)=>{
    return AllFriends.filter((friend)=>friend.isFriend);
})


export default FriendSlice.reducer;
export const { RealtimeAddFriend , RealtimeRemoveFriend , setFriendAsBlocked,setFriendAsUnblocked , fetchFriends , fetchFriendsFailure , fetchFriendsSuccess , unFriend , unFriendFailure , unFriendSuccess} = FriendSlice.actions;  
