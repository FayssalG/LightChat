import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name:'auth',
    initialState : {
        isAuth : JSON.parse(localStorage.getItem('newchat-isAuth')) || false,
        isAuthenticating : false,
        user : false,
    },
    reducers:{
        setIsAuth : (state , action)=>{
            state.isAuth = action.payload;
        },
        setUser : (state , action)=>{
            state.user = action.payload;
        },
        setIsAuthenticating : (state , action)=>{
            state.isAuthenticating = action.payload;
        }
    }
})

export default  AuthSlice.reducer;
export const { setIsAuth, setIsAuthenticating , setUser } = AuthSlice.actions;