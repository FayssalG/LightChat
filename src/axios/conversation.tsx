import {api} from './axios';

const get_conversations = async ()=>{
    const res = await api.get('/api/conversations');
    return res;
}

const send_message = async (receiver_id : string , text : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/conversations/send-message' , {receiver_id , text});
    return res;
}
export {get_conversations , send_message}