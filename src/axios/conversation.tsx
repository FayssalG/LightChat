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

const send_message_attachment = async (receiver_id:string, attachment : File , text ?:string )=>{
    await api.get('/sanctum/csrf-cookie');
    const formData = new FormData();
    formData.append('receiver_id', receiver_id);
    formData.append('text', text );
    formData.append('attachment', attachment);

    const res = await api.post('/api/conversations/send-message-attachment' , formData , {headers:{'Content-Type':'multipart/form-data'}});
    return res;
} 

const messages_seen = async (conversationId : string)=>{
    await api.get('/sanctum/csrf-cookie');
    const res = await api.post('/api/conversations/messages-seen' , {conversation_id:conversationId});
    return res;
}
export {get_conversations , send_message ,send_message_attachment , messages_seen} 