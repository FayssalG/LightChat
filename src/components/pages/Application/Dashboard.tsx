import styles from './Dashboard.module.css';
import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import EmailNotVerified from '@/components/pages/Application/EmailNotVerified/EmailNotVerified';
import { useEffect } from 'react';
import { useSocket } from '@/components/context/SocketProvider';
import NoActiveConversation from './NoActiveConverastion/NoActiveConversation';

import VoiceCall from './VoiceCall/VoiceCall';
import VideoCall from './VideoCall/VideoCall';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCall } from '@/components/context/CallProvider/CallProvider';
import {useGetConversationsQuery } from '@/redux/features/Conversation/conversationApi';
import { baseApi } from '@/redux/features/baseApi';
import { openConversation } from '@/redux/features/Conversation/ConversationSlice';
import { useGetUserQuery } from '@/redux/features/auth/authApi';
import { toast } from 'react-toastify';
import { useGetGroupsQuery } from '@/redux/features/group/groupApi';
import ActiveGroupConversation from './ActiveGroupConversation/ActiveGroupConversation';
import FriendsSection from './Sections/Friends/FriendsSection';
import ConversationsSection from './Sections/Conversations/ConversationsSection';
import GroupsSection from './Sections/Groups/GroupsSection';

export default function Dashboard() {
  const navigate = useNavigate();
  const {isVerified} : {isVerified : Boolean} = useGetUserQuery(undefined , {
    selectFromResult : ({data})=>({
      isVerified : (data?.email_verified_at !== null)
    })
  });
  const socket = useSocket()
  
  const {callStatus}= useCall()

  const dispatch = useDispatch();

  //listen for changes in friend requests
  useEffect(()=>{
    if(socket){
      socket.on('request-received' , (data)=>{
        dispatch(baseApi.util.invalidateTags(['Requests']))
        toast.info('@'+data.username + ' has sent you a friend request' , {
          theme:'colored',
          position : 'top-right'
        })        
      })

      socket.on('request-deleted' , (data)=>{
          dispatch(baseApi.util.invalidateTags(['Requests']))
      })

      
      socket.on('request-accepted' , ({friend})=>{
        if(friend){
          dispatch(baseApi.util.invalidateTags(['Friends'  ,  'Requests' , 'Conversations']))
        }
        
        toast.info('@'+friend.username + ' has accepted your request' , {
          theme:'colored',
          position : 'top-right'
        })
      })

      
      socket.on('friend-removed' , (frinedshipId : string)=>{
        console.log(frinedshipId)
        dispatch(baseApi.util.invalidateTags(['Friends']));
      })

      socket.on('message-received' , ({message,sender} : {message:FriendMessage , sender:Friend})=>{
        dispatch(openConversation(message.conversation_id))
        dispatch(baseApi.util.invalidateTags(['Messages']))
      })


      socket.on('message-updated' , ({message })=>{
        if(message){
          dispatch(baseApi.util.invalidateTags(['Messages']))
        }
      })

      socket.on('message-deleted' , ({message })=>{
        if(message){
          dispatch(baseApi.util.invalidateTags(['Messages']))
        }
      })


      socket.on('members-added-to-group' , ()=>{
        dispatch(baseApi.util.invalidateTags(['groups']))
      })

      socket.on('member-removed-from-group' , ()=>{
        dispatch(baseApi.util.invalidateTags(['groups']))
      })
      
      socket.on('group-message-received' , ({groupMessage} : {message:FriendMessage , sender:Friend})=>{
        dispatch(baseApi.util.invalidateTags(['groupMessages']))
      })

      socket.on('group-message-updated' , ({groupMessage})=>{
        if(groupMessage){
          dispatch(baseApi.util.invalidateTags(['groupMessages']))
        }
      })
      socket.on('group-message-deleted' , ({groupMessage })=>{
        if(groupMessage){
          dispatch(baseApi.util.invalidateTags(['groupMessages']))
        }
      })
      
      socket.on('messages-seen' , (conversationId : string)=>{
        console.log({conversationId})
        if(conversationId){
          // dispatch(setRealtimeMessagesSeen({conversationId , myUserId:user.id}));
          dispatch(baseApi.util.invalidateTags(['Messages']))
        }
      })



      
      socket.on('online-status-change' , ({userId , onlineStatus})=>{
          dispatch(baseApi.util.invalidateTags(['Friends' ]));
      })

    }
  },[socket])
 
  const activeSection = useSelector(state=>state.ui.activeSection)
  const renderSections = ()=>{
    switch(activeSection){
      case 'friends' :
        return <FriendsSection/>
      case 'conversations' : 
        return <ConversationsSection/>
      case 'groups' : 
        return <GroupsSection/>

    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.navbar}>
          <Navbar/>
        </div>

        <div className={styles.sections_activeconversation}>
            <div className={styles.email_verification}>
              { !isVerified && <EmailNotVerified/>}
            </div>

            <div className={styles.sections}>
              {renderSections()}
            </div>          

              <div className={styles.active_conversation}>
                  <Outlet/>
              </div>          
            

            {['calling' , 'ongoing'].includes(callStatus.audio) && <VoiceCall />}
            {['calling' , 'ongoing'].includes(callStatus.video)  && <VideoCall/>}
                    
        </div>        

    </div>
  )
}
