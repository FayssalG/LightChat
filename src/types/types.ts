interface User  {
    id:string,
    display_name : string,
    username : string,
    image : string,
    email : string,
    email_verified_at : string
}

interface Friend {
    conversation_id : string,
    friendship_id : string,
    user_id: string,
    display_name : string,
    username : string,
    image : string,
    isFriend : boolean,
    isBlocked : boolean,
    online_status: string | Date,
}

interface Conversation {
    isOpen? : boolean,
    friend_id: string,
    conversation_id :string,
    messagesIds : [number?]
}


interface FriendMessage{
    isSent? : boolean,
    isReceived? : boolean,
    created_at? : string,
    conversation_id : string,
    id:string,
    sender_id : string,
    receiver_id : string,
    text : string,
}



interface FriendRequest {
    request_id : string,
    sender_id : string,
    user_id: string,
    display_name : string,
    username : string,
    image : string,
}

interface BlockedUser {
    block_id : string,
    user_id: string,
    display_name : string,
    username : string,
    image : string,
}


