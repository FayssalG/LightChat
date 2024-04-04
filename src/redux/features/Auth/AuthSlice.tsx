import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name:'auth',
    initialState : {
        status : 'idle',
        error: null,
        isAuth :  false,
        isVerified : false,
        user  : {},
    },
    reducers:{
        fetchUser : (state)=>{
            state.status = 'loading'
        },
        fetchUserSuccess : (state , action)=>{
            console.log({TEST:action.payload})
            state.status = 'succeeded'
            state.isAuth = true
            state.user = action.payload
        },
        fetchUserFailed : (state , action)=>{
            state.status = 'failed'
            state.isAuth = false
            state.error = action.payload
        },

        setIsAuth : (state , action)=>{
            state.isAuth = action.payload;
        },
        setUser : (state , action)=>{
            state.user = action.payload;
        },
        setIsVerified:(state , action)=>{
            state.isVerified=action.payload;
        },

        updateUser : (state , action)=>{
            state.user = {...state.user , ...action.payload}
        }

    }
})

export default  AuthSlice.reducer;
export const {fetchUser , fetchUserFailed,fetchUserSuccess, setIsAuth , setIsVerified , setUser , updateUser} = AuthSlice.actions;