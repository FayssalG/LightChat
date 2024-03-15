import {api} from './axios';

const update_image = async (id : string , image : File , password:string)=>{
    await api.get('/sanctum/csrf-cookie');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id);
    formData.append('password', password);

    const res = api.post('/api/user/image/update' , formData , {headers:{'Content-Type':'multipart/form-data'}})
    return res
}

const update_display_name = async (id : string , newDisplayName : string , password:string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = api.post('/api/user/displayname/update' , {id , display_name:newDisplayName , password} )
    return res
}

const update_username = async (id : string , newUsername : string , password:string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = api.post('/api/user/username/update' , {id , username:newUsername , password} )
    return res
}


const update_email = async (id : string , newEmail : string , password:string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = api.post('/api/user/email/update' , {id , email:newEmail , password} )
    return res
}



export {update_image , update_display_name , update_email , update_username}