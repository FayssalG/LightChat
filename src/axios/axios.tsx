import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:8000',
    withCredentials:true,
    withXSRFToken:true,
    headers:{
        Accept: 'application/json'
    }
});

const login = async (email : string , password : string)=>{
    await api.get('/sanctum/csrf-cookie')
    const res = await api.post('/login' , {email , password})   
    return res
}

const register = async (email : string , displaName : string , username:string , password : string , passwordConfirmation : string)=>{
    await api.get('/sanctum/csrf-cookie')
    const data = {
        email ,
        username,
        password,
        display_name : displaName,
        password_confirmation : passwordConfirmation, 
    }
    const res = await api.post('/register' , data)
    return res
}

const getUser = async ()=>{
    const res = await api.get('/api/user')
    return res
}

async function logout(){
    const response = await api.post('/logout')
    return response
}

export {login , register , logout , getUser};