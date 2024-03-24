import styles from './Application.module.css';
import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import ConversationsSection from "./Sections/Conversations/ConversationsSection";
import FriendsSection from "./Sections/Friends/FriendsSection";
import GroupsSection from "./Sections/Groups/GroupsSection";

// import AddFriendModal from "@/components/modals/AddFriendModal/AddFriendModal";
// import FriendDetailsModal from "@/components/modals/FriendDetailsModal/FriendDetailsModal";
// import ConfirmBlockFriendModal from "@/components/modals/ConfirmBlockFriendModal/ConfirmBlockFriendModal";
// import CreateGroupModal from "@/components/modals/CreateGroupModal/CreateGroupModal";
// import GroupDetailsModal from "@/components/modals/GroupDetailsModal/GroupDetailsModal";
// import ConfirmRemoveFriendModal from '@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal';

import { useDispatch, useSelector } from "react-redux";
import EmailNotVerified from '@/components/pages/Application/EmailNotVerified/EmailNotVerified';
import { useEffect } from 'react';
import { block_user, get_blocked_users, get_friend_requests, get_friends, unblock_user } from '@/axios/friend';
import { useSocket } from '@/components/context/SocketProvider';
import { get_conversations } from '@/axios/conversation';
import {  addReceivedMessage, fetchConversations, setConversations } from '@/redux/features/Conversation/ConversationSlice';
import { addRequest, fetchRequests, getRequests, removeRequest, setRequests } from '@/redux/features/FriendRequest/FriendRequestSlice';
import { addFriend, fetchFriends, removeFriend } from '@/redux/features/Friend/FriendSlice';
import { fetchBlockedUsers, setBlockedUsers } from '@/redux/features/Block/BlockSlice';



export default function Application() {
  const visibleSection : string = useSelector(state=>state.ui.visibleSection)
  const isVerified : Boolean = useSelector(state => state.auth.isVerified);
  const socket = useSocket()
  const dispatch = useDispatch();


  //listen for changes in friend requests
  useEffect(()=>{
    if(socket){
      socket.on('request-received' , (data)=>{
        if(data){
          dispatch(addRequest(data));
        }
      })

      socket.on('request-deleted' , (data)=>{
        if(data){
          dispatch(removeRequest(data.request_id));
        }
      })

      
      socket.on('request-accepted' , (data)=>{
        if(data){
          dispatch(removeRequest(data.request_id));
          dispatch(addFriend(data.friend));
        }
      })

      socket.on('friend-removed' , (frinedshipId : string)=>{
        if(frinedshipId){
          dispatch(removeFriend(frinedshipId));
        }
      })

      socket.on('message-received' , ({message , sender} : {message:FriendMessage , sender:Friend})=>{
        if(message){
          dispatch(addReceivedMessage({newMessage:message , senderInfos:sender}));
        }
      })
      
    }
  },[socket])


  useEffect(()=>{
    dispatch(fetchFriends());
    dispatch(fetchConversations());
    dispatch(fetchBlockedUsers());
    dispatch(fetchRequests())

  },[dispatch])
 

  const selectedSection  = ()=>{
    switch(visibleSection){
      case 'friends':
        return <FriendsSection/>
      case 'conversations':
        return <ConversationsSection/>
      case 'groups':
        return <GroupsSection/>
    }
  }
  
  return (
    <>
        <Navbar/>

        <div className={styles.sections_activeconversation}>
          { !isVerified &&
            <div className={styles.email_verification}><EmailNotVerified/></div>
          }
          
          {selectedSection()}
          <ActiveConversation/>
        </div>        

    </>
  )
}
