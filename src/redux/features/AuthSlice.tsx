import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name:'auth',
    initialState : {
        isAuth : JSON.parse(localStorage.getItem('newchat-isAuth')) || false,
        isVerified : JSON.parse(localStorage.getItem("newchat-isVerified")) || false,
        isLoading : false,
        authenticatedUser : null,
    },
    reducers:{
        setIsAuth : (state , action)=>{
            state.isAuth = action.payload;
        },
        setAuthenticatedUser : (state , action)=>{
            state.authenticatedUser = action.payload;
        },
        setIsLoading : (state , action)=>{
            state.isLoading = action.payload;
        },
        setIsVerified:(state , action)=>{
            state.isVerified=action.payload;
        }

    }
})

export default  AuthSlice.reducer;
export const { setIsAuth , setIsVerified, setIsLoading , setAuthenticatedUser } = AuthSlice.actions;