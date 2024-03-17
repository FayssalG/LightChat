import {api} from './axios';

const get_friends = async ()=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.get('/api/friends/accepted');
    return res;
}

const get_pending_friends = async ()=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.get('/api/friends/pending');
    return res;
}

const send_friend_request = async (friendId)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/request/send' ,{friend_id:friendId} );
    return res;
}


export {get_friends , get_pending_friends}