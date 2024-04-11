import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";


const authSlice = createSlice({
    name:'auth',
    initialState : {
        isAuth :  false,
        isVerified : false,
        user  : {},
    },
    
    reducers:{},
    
    extraReducers : (builder)=>{
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state , action)=>{
                state.isAuth = true
            }
        ),
        builder.addMatcher(
            authApi.endpoints.getUser.matchFulfilled,
            (state , action)=>{
                state.isAuth = true
                state.user = action.payload
                if(action.payload.email_verified_at) state.isVerified = true
            }
        ),
        builder.addMatcher(
            authApi.endpoints.getUser.matchRejected,
            (state , action)=>{
                state.isAuth = false;
                state.user = {};
            }
        ),
        builder.addMatcher(
            authApi.endpoints.logout.matchFulfilled,
            (state , action)=>{
                state.isAuth = false;
                state.user = {};
                      
            }
        ),
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state )=>{
                state.isAuth = true;
            }
        )

    }
})

export default  authSlice.reducer;
export const {fetchUser,
    fetchUserFailure,
    fetchUserSuccess,
    
    loginUser, 
    loginUserSuccess,
    loginUserFailure,

    registerUser,
    registerUserSuccess,
    registerUserFailure ,

    passwordForgot,
    passwordForgotSuccess,
    passwordForgotFailure,

    passwordReset,
    passwordResetSuccess,
    passwordResetFailure,
    
    logoutUser,
    logoutUserSuccess,
    logoutUserFailure,

    setIsAuth ,
    setIsVerified ,
    setUser ,
    updateUser} = authSlice.actions;