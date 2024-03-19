import { createSlice } from "@reduxjs/toolkit";


const FriendSlice = createSlice({
    name : 'friend',
    initialState : {
        isLoadingFriend : false,
        selectedFriend : null,
        friends : [],
        requests : []
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
            state.friends.push(action.payload);
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
            state.requests = state.requests.filter((item:Friend)=>{
                return item.request_id != action.payload
            })
        }
    }
})


export default FriendSlice.reducer;
export const {setIsLoadingFriend, setSelectedFriend, setFriends  ,addFriend , removeFriend ,setRequests , addRequest, removeRequest} = FriendSlice.actions;  