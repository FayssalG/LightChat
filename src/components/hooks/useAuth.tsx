import { useEffect } from "react";
import {login, register , logout, getUser, forgot, reset} from '@/axios/axios';
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticatedUser, setIsAuth, setIsAuthenticating } from "@/redux/features/AuthSlice";

export default function useAuth(){
    const isAuth = useSelector(state => state.auth.isAuth);
    const isAuthenticating = useSelector(state => state.auth.isAuthenticating);
    const authenticatedUser = useSelector(state=>state.auth.authenticatedUser);
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
      
    const forgotPassword = async  (email : string)=>{
        try{
            dispatch(setIsAuthenticating(true))
            const response = await forgot(email);
            return response.data; 
        }catch(err){
            console.log(err)
        }
        finally{
            dispatch(setIsAuthenticating(false))
        }
    }

    const resetPassword = async (token : string , email : string, password : string , passwordConfirmation : string )=>{
        try{
            dispatch(setIsAuthenticating(true))
            const res = await reset(token,email,password,passwordConfirmation);
            return res
        }catch(err){
            throw err;
        }
        finally{
            dispatch(setIsAuthenticating(false))
        }
    }
 

    return {isAuth, isAuthenticating , authenticatedUser , loginUser , registerUser , logoutUser , getAuthenticatedUser , forgotPassword  , resetPassword}
}