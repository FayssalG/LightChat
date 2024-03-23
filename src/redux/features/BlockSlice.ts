import { get_friend_requests, get_friends } from "@/axios/friend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const fetchBlockedUsers = createAsyncThunk('friend/fetchBlockedUsers', async () =>{
    try{
        const response = await get_friend_requests();
        return [...response.data];
    }catch(err){
        return err.message;
    }
})

const BlockSlice = createSlice({
    name : 'block',
    initialState : {
        status : 'idle',
        error : null,
        blockedUsers: [],
    },
    reducers: {
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
        builder.addCase(fetchBlockedUsers.fulfilled , (state ,action)=>{
            state.status = 'succeeded';
            state.blockedUsers = action.payload;
        })
        builder.addCase(fetchBlockedUsers.pending , (state ,action)=>{
            state.status = 'loading'
        })
        builder.addCase(fetchBlockedUsers.rejected , (state ,action)=>{
            state.status = 'failed';
            state.error = action.payload;
        })
    }

})


export default BlockSlice.reducer;
export const {setBlockedUsers,removeBlockedUser,addBlockedUser} = BlockSlice.actions;  