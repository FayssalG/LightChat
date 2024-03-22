import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name:'auth',
    initialState : {
        isAuth :  false,
        isVerified : false,
        user  : {},
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
        },

        updateUser : (state , action)=>{
            state.user = {...state.user , ...action.payload}
        }

    }
})

export default  AuthSlice.reducer;
export const { setIsAuth , setIsVerified , setUser , updateUser} = AuthSlice.actions;