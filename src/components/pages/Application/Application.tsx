import styles from './Application.module.css';
import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import ConversationsSection from "./Sections/Conversations/ConversationsSection";
import FriendsSection from "./Sections/Friends/FriendsSection";
import GroupsSection from "./Sections/Groups/GroupsSection";

import { useDispatch, useSelector } from "react-redux";
import EmailNotVerified from '@/components/pages/Application/EmailNotVerified/EmailNotVerified';
import { useEffect } from 'react';
import { useSocket } from '@/components/context/SocketProvider';
import {  addRealtimeMessage,  fetchConversations, fetchMessages, setRealtimeMessagesSeen } from '@/redux/features/Conversation/ConversationSlice';
import { addRequest, fetchRequests, removeRequest } from '@/redux/features/FriendRequest/FriendRequestSlice';
import { RealtimeAddFriend, RealtimeChangeFriendStatus, RealtimeRemoveFriend, fetchFriends } from '@/redux/features/Friend/FriendSlice';
import { fetchBlockedUsers} from '@/redux/features/Block/BlockSlice';
import useAuth from '@/components/hooks/useAuth';
import { selectActiveConversation } from '@/redux/features/Conversation/ConversationSelectors';
import NoActiveConversation from './NoActiveConverastion/NoActiveConversation';



export default function Application() {
  const {user} = useAuth();
  const visibleSection : string = useSelector(state=>state.ui.visibleSection)
  const isVerified : Boolean = useSelector(state => state.auth.isVerified);
  const socket = useSocket()
  const activeConversation  = useSelector(selectActiveConversation)

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
          dispatch(fetchConversations());
          dispatch(removeRequest(data.request_id));
          dispatch(RealtimeAddFriend(data.friend));
        }
      })

      socket.on('friend-removed' , (frinedshipId : string)=>{
        console.log({frinedshipId})
        if(frinedshipId){
          dispatch(RealtimeRemoveFriend(frinedshipId));
        }
      })

      socket.on('message-received' , ({message , sender} : {message:FriendMessage , sender:Friend})=>{
        if(message){
          dispatch(addRealtimeMessage({newMessage:message , senderInfos:sender}));
        }
      })

      
      socket.on('messages-seen' , (conversationId : string)=>{
        console.log({conversationId})
        if(conversationId){
          dispatch(setRealtimeMessagesSeen({conversationId , myUserId:user.id}));
        }
      })


      
      socket.on('online-status-change' , ({userId , onlineStatus})=>{
          dispatch(RealtimeChangeFriendStatus({friendId:userId , onlineStatus}));
      })

    }
  },[socket])


  useEffect(()=>{
    const timestamp = JSON.parse(localStorage.getItem('neochat-timestamp'));    
    const now = new Date();
    const lastFetchDate = new Date(timestamp) 
    //if timestamp is null date given here is unix epoch
  
    const isOld = (Math.round((now.getTime() - lastFetchDate.getTime()) / (1000*60)) > 20) // in minutes
    
    dispatch(fetchMessages());
    if(isOld){
      console.log({isOld})
      dispatch(fetchFriends());
      dispatch(fetchConversations());
      dispatch(fetchBlockedUsers());
      dispatch(fetchRequests())
      localStorage.setItem('neochat-timestamp' , JSON.stringify(now));    
    }
    
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

  const renderActiveConversation = ()=>{
      if(!activeConversation){
        return <NoActiveConversation/>
      }

      return <ActiveConversation activeConversation={activeConversation}/>
  }
  
  return (
    <>
        <Navbar/>

        <div className={styles.sections_activeconversation}>
          { !isVerified &&
            <div className={styles.email_verification}><EmailNotVerified/></div>
          }
          
          {selectedSection()}

          {renderActiveConversation()}
        </div>        

    </>
  )
}
