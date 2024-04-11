// import { cancel_friend_request, get_friend_requests,  ignore_friend_request,  send_friend_request } from "@/axios/friend";
// import { Action, AsyncThunkAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";



// export const fetchRequests = createAsyncThunk('friendRequest/fetchRequests', async () =>{
//     try{
//         const response = await get_friend_requests();
//         return [...response.data];
//     }catch(err){
//         return err.message;
//     }
// })

// export const sendRequest = createAsyncThunk('friendRequest/sendRequest' , async (username : string , {rejectWithValue})=>{
//     try{
//         const response = await send_friend_request(username);
//         return response.data
//     }catch(err){
//         throw rejectWithValue(err.response.data.errors[0]);
//     }
// })

// export const ignoreRequest = createAsyncThunk('friendRequest/ignoreRequest' , async (request_id : string , {rejectWithValue})=>{
//     try{
//         const response = await ignore_friend_request(request_id);
//         return response.data
//     }catch(err){
//         throw rejectWithValue(err.response.data.errors[0]);
//     }
// })

// export const cancelRequest = createAsyncThunk('friendRequest/cancelRequest' , async (request_id : string , {rejectWithValue})=>{
//     try{
//         const response = await cancel_friend_request(request_id);
//         return response.data
//     }catch(err){
//         throw rejectWithValue(err.response.data.errors[0]);
//     }
// })


// const FriendRequestSlice = createSlice({
//     name : 'friendRequest',
//     initialState : {
//         status : 'idle',
//         error : null,
//         requests : [],
//     },
//     reducers: {
 
//         setRequests : (state , action)=>{
//             if(state.requests.find((request : FriendRequest)=>request.request_id == action.payload) ) return
//             state.requests = action.payload
//         },
//         addRequest : (state , action)=>{
//             state.requests.push(action.payload)
//         },
//         removeRequest : (state , action)=>{
//             state.requests = state.requests.filter((item:FriendRequest)=>{
//                 return item.request_id != action.payload
//             })
//         },

//     },
//     extraReducers(builder) {
//         builder.addCase(fetchRequests.fulfilled , (state ,action : PayloadAction<[]>)=>{
//             state.status = 'succeeded'
//             state.requests = action.payload
//             state.error = null;
//         })
//         builder.addCase(fetchRequests.pending , (state ,action : Action)=>{
//             state.status = 'loading'
//         })
//         builder.addCase(fetchRequests.rejected , (state ,action : Action)=>{
//             state.status = 'failed';
//             state.error = action.payload;
//         })

//         //send request
//         builder.addCase(sendRequest.fulfilled , (state ,action : Action)=>{
//             state.status = 'succeeded'
//             state.requests.push(action.payload)
//         })
//         builder.addCase(sendRequest.pending , (state , action : Action)=>{
//             state.status = 'loading'
//         })
//         builder.addCase(sendRequest.rejected , (state ,action : Action)=>{
//             state.status = 'failed';
//             state.error = action.payload;
//         })

//         //remove a request (cancel / ignore)
//         builder.addCase(ignoreRequest.fulfilled , (state ,action : Action)=>{
//             state.status = 'succeeded'
//             state.requests.push(action.payload)
//         })
//         builder.addCase(ignoreRequest.pending , (state , action : Action)=>{
//             state.status = 'loading'
//         })
//         builder.addCase(ignoreRequest.rejected , (state ,action : Action)=>{
//             state.status = 'failed';
//             state.error = action.payload;
//         })

//          //remove a request (cancel / ignore)
//          builder.addCase(cancelRequest.fulfilled , (state ,action : Action)=>{
//             state.status = 'succeeded'
//             state.requests.push(action.payload)
//         })
//         builder.addCase(cancelRequest.pending , (state , action : Action)=>{
//             state.status = 'loading'
//         })
//         builder.addCase(cancelRequest.rejected , (state ,action : Action)=>{
//             state.status = 'failed';
//             state.error = action.payload;
//         })

//     }

// })


// export default FriendRequestSlice.reducer;
// export const {setRequests , addRequest, removeRequest} = FriendRequestSlice.actions;  


//////////////////////////////////////////////////////////////////////////////////



import { createSlice } from "@reduxjs/toolkit";


const FriendRequestSlice = createSlice({
    name : 'friendRequest',
    initialState : {
        status : 'idle',
        error : null,
        requests : [],
    },
    reducers: { 
    },

})



export default FriendRequestSlice.reducer;
export const {} 
= FriendRequestSlice.actions;  








