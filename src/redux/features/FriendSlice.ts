import { createSlice } from "@reduxjs/toolkit";


const FriendSlice = createSlice({
    name : 'friend',
    initialState : {
        isLoadingFriend : false,
        selectedFriend : null,
        friends : [],
        pendingFriends : []
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
          const index = state.friends.findIndex((item:Friend)=> item.id === action.payload);     
          if(index !== -1){
              state.friends.splice( index, 1);
          }else{
              console.log("The friend is not in your friend list");
          }           
        },


        setPendingFriends : (state , action)=>{
            state.pendingFriends = action.payload
        },
        addPendingFriend : (state , action)=>{
            state.pendingFriends.push(action.payload)
        },
        removePendingFriend : (state , action)=>{
            state.pendingFriends = state.pendingFriends.filter((item:Friend)=>{
                return item.id != action.payload
            })
        }
    }
})

export default FriendSlice.reducer;
export const {setIsLoadingFriend, setSelectedFriend, setFriends  ,addFriend , removeFriend ,setPendingFriends , addPendingFriend, removePendingFriend} = FriendSlice.actions;  