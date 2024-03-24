interface User  {
    id:string,
    display_name : string,
    username : string,
    image : string,
    email : string,
    email_verified_at : string
}

interface Friend {
    friendship_id : string,
    // initiator : string,
    user_id: string,
    display_name : string,
    username : string,
    image : string,

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

interface Conversation {
    isActive? : boolean,
    conversation_id :string,
    conversationWith : Friend,
    messages : [FriendMessage?]
}
