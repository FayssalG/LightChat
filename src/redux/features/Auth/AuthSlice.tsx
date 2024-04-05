import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name:'auth',
    initialState : {
        fetchStatus : 'idle',
        fetchError : null,

        loginStatus : 'idle',
        loginError: null,

        registerStatus : 'idle',
        registerError: null,

        passwordForgotStatus : 'idle',
        passwordForgotError : null,

        passwordResetStatus : 'idle',
        passwordResetError : null,

        logoutStatus : 'idle',
        logoutError : null,

        isAuth :  false,
        isVerified : false,
        user  : {},
    },
    reducers:{
        fetchUser : (state)=>{
            state.fetchStatus = 'loading'
        },
        fetchUserSuccess : (state , action)=>{
            console.log({TEST:action.payload})
            state.fetchStatus = 'succeeded'
            state.isAuth = true
            state.user = action.payload
        },
        fetchUserFailure : (state , action)=>{
            state.fetchStatus = 'failed'
            state.isAuth = false
            state.fetchError = action.payload
        },
        
        loginUser : (state , action)=>{
            state.loginStatus = 'loading'
        },
        loginUserSuccess : (state)=>{
            state.loginStatus = 'succeeded'
            state.loginError = null
            state.isAuth = true
        },

        loginUserFailure : (state , action)=>{
            state.loginStatus = 'failed'
            state.loginError = action.payload
            state.isAuth = false
        },


        registerUser : (state , action)=>{
            state.registerStatus = 'loading'
        },
        registerUserSuccess : (state)=>{
            state.registerStatus = 'succeeded'
            state.registerError = null
            state.isAuth = true
        },

        registerUserFailure : (state , action)=>{
            state.registerStatus = 'failed'
            state.isAuth = false
            state.registerError = action.payload
        },

        passwordForgot : (state , action)=>{
            state.passwordForgotStatus = 'loading'
        },
        
        passwordForgotSuccess : (state)=>{
            state.passwordForgotStatus = 'succeeded'
            state.passwordForgotError = null
        },

        passwordForgotFailure : (state , action)=>{
            state.passwordForgotStatus = 'failed'
            state.passwordForgotError = action.payload
        },

        passwordReset : (state , action)=>{
            state.passwordResetStatus = 'loading'
        },
        
        passwordResetSuccess : (state)=>{
            state.passwordResetStatus = 'succeeded'
            state.passwordResetError = null
        },

        passwordResetFailure : (state , action)=>{
            state.passwordResetStatus = 'failed'
            state.passwordResetError = action.payload
        },

        logoutUser : (state )=>{
            state.logoutStatus = 'loading'
        },
        
        logoutUserSuccess : (state)=>{
            state.isAuth = false;
            state.user = {};
            state.logoutStatus = 'succeeded'
            state.logoutError = null

        },

        logoutUserFailure : (state , action)=>{
            state.logoutStatus = 'failed'
            state.logoutError = action.payload
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
    updateUser} = AuthSlice.actions;