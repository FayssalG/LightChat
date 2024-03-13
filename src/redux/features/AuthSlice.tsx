import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name:'auth',
    initialState : {
        isAuth : JSON.parse(localStorage.getItem('newchat-isAuth')) || false,
        isAuthenticating : false,
        authenticatedUser : null,
    },
    reducers:{
        setIsAuth : (state , action)=>{
            state.isAuth = action.payload;
        },
        setAuthenticatedUser : (state , action)=>{
            state.authenticatedUser = action.payload;
        },
        setIsAuthenticating : (state , action)=>{
            state.isAuthenticating = action.payload;
        },

    }
})

export default  AuthSlice.reducer;
export const { setIsAuth, setIsAuthenticating , setAuthenticatedUser } = AuthSlice.actions;