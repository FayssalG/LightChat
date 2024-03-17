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

const send_friend_request = async (username : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/send-request' ,{username:username} );
    return res;
}

const cancel_friend_request = async (friendship_id : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/cancel-request' , {friendship_id});
    return res;
}

const ignore_friend_request = async (friendship_id : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/ignore-request' , {friendship_id});
    return res;
}

const accept_friend_request = async (friendship_id : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/accept-request' , {friendship_id});
    return res;
}



export {get_friends , get_pending_friends , send_friend_request , accept_friend_request , cancel_friend_request , ignore_friend_request}