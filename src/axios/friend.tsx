import {api} from './axios';

const get_all_friends = async ()=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.get('/api/friends');
    return res;
}


export {get_all_friends}