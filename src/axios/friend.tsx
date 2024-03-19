import {api} from './axios';

const get_friends = async ()=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.get('/api/friends/accepted');
    return res;
}

const get_blocked_users = async ()=>{
    const res = await api.get('/api/friends/blocked');
    return res;
}

const block_user = async (username : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/block' , {username});
    return res;
}

const unblock_user = async (username : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/unblock' , {username});
    return res;
}


const get_friend_requests = async ()=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.get('/api/friends/requests');
    return res;
}

const send_friend_request = async (username : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/send-request' ,{username:username} );
    return res;
}

const cancel_friend_request = async (request_id : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/cancel-request' , {request_id});
    return res;
}

const ignore_friend_request = async (request_id : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/ignore-request' , {request_id});
    return res;
}

const accept_friend_request = async (request_id : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/accept-request' , {request_id});
    return res;
}

const remove_friend = async (friendship_id : string)=>{
    console.log({friendship_id});
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/friends/remove' , {friendship_id});
    return res;
}


export {get_friends, get_blocked_users , block_user , unblock_user , get_friend_requests , send_friend_request , accept_friend_request , cancel_friend_request , ignore_friend_request , remove_friend}