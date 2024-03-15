import {api} from './axios';

const update_image = async (id : string , image : File)=>{
    await api.get('/sanctum/csrf-cookie');
    const formData = new FormData();
    formData.append('image', image);
    formData.append('id', id);
    const res = api.post('/api/user/image/update' , formData , {headers:{'Content-Type':'multipart/form-data'}})
    return res
}

export {update_image}