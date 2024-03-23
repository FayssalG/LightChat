import { createSlice } from "@reduxjs/toolkit";


const BlockSlice = createSlice({
    name : 'block',
    initialState : {
        status : 'idle',
        error : null,
        blockedUsers: [],
    },
    reducers: {

        fetchBlockedUsers:(state)=>{
            state.status = 'loading';
            state.error = null ;
        },
        fetchBlockedUsersSuccess:(state,action)=>{
            state.status = 'succeeded';
            state.error = null ;
            state.blockedUsers = action.payload
        },
        fetchBlockedUsersFailure:(state,action)=>{
            state.status = 'failed';
            state.error = action.payload ;
        },

        blockUser : (state , action)=>{
            state.status = 'loading'
            state.error = null ;
        },
        blockUserSuccess : (state , action)=>{
            state.status = 'succeded'
            state.blockedUsers.push(action.payload);
        },
        blockUserFailure : (state , action)=>{
            state.status = 'failed';
            state.error = action.payload ;
        },

        unBlockUser : (state , action)=>{
            state.status = 'loading'
            state.error = null ;
        },
        unBlockUserSuccess : (state , action)=>{
            state.status = 'succeded'
            state.blockedUsers = state.blockedUsers.filter((blockedUser)=>{
                return blockedUser.username != action.payload
            })
            state.error = null ;
        },
        unBlockUserFailure : (state , action)=>{
            state.status = 'failed';
            state.error = action.payload ;
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

})



export default BlockSlice.reducer;
export const {removeBlockedUser,
    addBlockedUser , 
    fetchBlockedUsers ,
    fetchBlockedUsersSuccess , 
    fetchBlockedUsersFailure , 
    
    blockUser,
    blockUserSuccess,
    blockUserFailure , 
    
    unBlockUser, 
    unBlockUserSuccess , 
    unBlockUserFailure

} = BlockSlice.actions;  

