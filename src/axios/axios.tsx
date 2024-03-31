import axios from "axios";

const api = axios.create({
    baseURL:'https://localhost:8000',
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

const forgot = async (email : string)=>{
    await api.get('/sanctum/csrf-cookie')
    const res = await api.post('/forgot-password' , {email});
    return res
}

const reset = async (token : string , email : string, password : string , passwordConfirmation : string )=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/reset-password' , {
        token ,
        email,
        password,
        password_confirmation:passwordConfirmation
    })
    return res
}

const verify = async ()=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/email/verification-notification');
    return res
}

async function logout(){
    const response = await api.post('/logout')
    return response
}


export {api , login , register, forgot , reset , logout , getUser , verify};