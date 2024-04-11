import { useEffect, useState } from "react";
import {login, register , logout, getUser, forgot, reset , verify} from '@/axios/axios';
import { useDispatch, useSelector } from "react-redux";
import { setUser, setIsAuth, setIsVerified } from "@/redux/features/auth/authSlice";
import { mark_user_connected, mark_user_disconnected } from "@/axios/user";

export default function useAuth(){
    const [isLoading , setIsLoading] = useState(false);
    const isAuth = useSelector(state => state.auth.isAuth);
    const isVerified = useSelector(state=>state.auth.isVerified);
    const user = useSelector(state=>state.auth.user);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     localStorage.setItem('newchat-isAuth', JSON.stringify(isAuth))
    // },[isAuth ])
    
    // useEffect(()=>{
    //     localStorage.setItem('newchat-isVerified', JSON.stringify(isVerified))
    // },[isVerified ])



    const loginUser = async (email : string , password : string , setError : Function)=>{
        setIsLoading(true)
        try{
            await login(email ,password)
            dispatch(setIsAuth(true))
        }catch(err){
            if(err.response.status = 422){
                setError(err.response.data.message)
            }
        }
        finally{
            setIsLoading(false)
        }
    }  

    const registerUser = async (email : string , displaName : string , username:string , password : string , passwordConfirmation : string , setErrors:Function)=>{
        setIsLoading(true)
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
            setIsLoading(false)
        }
    }

    const verifyEmail = async ()=>{
        setIsLoading(true)
        try{
            const res = await verify();
            return res
        }catch(err){
            console.log(err)
            throw err
        }finally{
            setIsLoading(false)
        }
    }
   
    const logoutUser = async ()=>{
        const response = await logout();
        if(response.status == 204){
            dispatch(setUser(null))
            dispatch(setIsAuth(false))
            
        } 
    }
    
    const getAuthenticatedUser = async ()=>{
        try{
            const response = await getUser()        
            const user = response.data 
            dispatch(setUser(user))

            if(user.email_verified_at){
                dispatch(setIsVerified(true));
            }else{
                dispatch(setIsVerified(false));
            }
            return user
        }catch(err){
            dispatch(setIsAuth(false))
        }
    }
      
    const forgotPassword = async  (email : string)=>{
        try{
            setIsLoading(true)
            const response = await forgot(email);
            return response.data; 
        }catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
    }

    const resetPassword = async (token : string , email : string, password : string , passwordConfirmation : string )=>{
        try{
            setIsLoading(true)
            const res = await reset(token,email,password,passwordConfirmation);
            return res
        }catch(err){
            throw err;
        }
        finally{
            setIsLoading(false)
        }
    }
 

    return {isAuth, isLoading , user , loginUser , registerUser , logoutUser , getAuthenticatedUser , forgotPassword  , resetPassword , verifyEmail}
}