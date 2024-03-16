import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name:'auth',
    initialState : {
        isAuth : JSON.parse(localStorage.getItem('newchat-isAuth')) || false,
        isVerified : JSON.parse(localStorage.getItem("newchat-isVerified")) || false,
        user : null,
    },
    reducers:{
        setIsAuth : (state , action)=>{
            state.isAuth = action.payload;
        },
        setUser : (state , action)=>{
            state.user = action.payload;
        },
        setIsVerified:(state , action)=>{
            state.isVerified=action.payload;
        }

    }
})

export default  AuthSlice.reducer;
export const { setIsAuth , setIsVerified , setUser } = AuthSlice.actions;