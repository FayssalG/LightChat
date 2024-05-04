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
    online_status: string | Date,
}

interface Conversation {
    conversation_id :string,
    friend_id: string,
}


interface FriendMessage{
    id:string,
    conversation_id : string,
    created_at : string,
    sender_id : string,
    receiver_id : string,
    text : string,
    isSeen : boolean,
    isSent? : boolean,
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



interface Group  {
    id:string,
    name:string
    admin_id : string,
    members : [Member],
    group_conversation : GroupConverastion
}

interface Member{
    id:string,
    username:string,
    display_name:string,
    image : {url : string}
}

interface GroupConverastion{
    id:string,
    group_id : string,
}