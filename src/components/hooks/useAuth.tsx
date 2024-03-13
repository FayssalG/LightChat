import { useEffect } from "react";
import {login, register , logout, getUser} from '@/axios/axios';
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticatedUser, setIsAuth, setIsAuthenticating } from "@/redux/features/AuthSlice";

export default function useAuth(){
    const isAuth = useSelector(state => state.auth.isAuth);
    const isAuthenticating = useSelector(state => state.auth.isAuthenticating);
    const dispatch = useDispatch();

    useEffect(()=>{
        localStorage.setItem('newchat-isAuth', JSON.stringify(isAuth))
    },[isAuth ])

    const loginUser = async (email : string , password : string , setError : Function)=>{
        dispatch(setIsAuthenticating(true))
        try{
            await login(email ,password)
            dispatch(setIsAuth(true))
        }catch(err){
            if(err.response.status = 422){
                setError(err.response.data.message)
            }
        }
        finally{
            dispatch(setIsAuthenticating(false))
        }
    }  

    const registerUser = async (email : string , displaName : string , username:string , password : string , passwordConfirmation : string , setErrors:Function)=>{
        dispatch(setIsAuthenticating(true))
        try {
            await register(email , displaName , username , password , passwordConfirmation)
            dispatch(setIsAuth(true))
        }
        catch(err){
            if(err.response.status === 422 ){
                const {display_name:displayName } = err.response.data.errors
                setErrors({...err.response.data.errors , displayName})                    
            } 
        }
        finally{
            dispatch(setIsAuthenticating(false))
        }
    }
   
    const logoutUser = async ()=>{
        const response = await logout();
        if(response.status = 204) dispatch(setIsAuth(false))
    }
      
    const getAuthenticatedUser = async ()=>{
        try{
            const response = await getUser()
            dispatch(setAuthenticatedUser(response.data))
            return response.data
        }catch(err){
            dispatch(setIsAuth(false))
        }
    }
      
    return {isAuth, isAuthenticating , loginUser , registerUser , logoutUser , getAuthenticatedUser}
}