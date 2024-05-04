import styles from './Dashboard.module.css';
import Navbar from "./Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import EmailNotVerified from './EmailNotVerified/EmailNotVerified';
import { useEffect } from 'react';
import { useSocket } from '@/components/context/SocketProvider';

import VoiceCall from './VoiceCall/VoiceCall';
import VideoCall from './VideoCall/VideoCall';
import { Outlet } from 'react-router-dom';
import { useCall } from '@/components/context/CallProvider/CallProvider';
import { baseApi } from '@/redux/features/baseApi';
import { openConversation } from '@/redux/features/Conversation/ConversationSlice';
import { useGetUserQuery } from '@/redux/features/auth/authApi';
import { toast } from 'react-toastify';
import FriendsSection from './Sections/Friends/FriendsSection';
import ConversationsSection from './Sections/Conversations/ConversationsSection';
import GroupsSection from './Sections/Groups/GroupsSection';
import { showBadge } from '@/redux/features/UiSlice';

export default function Dashboard() {
  const {isVerified}  = useGetUserQuery(undefined , {
    selectFromResult : ({data})=>({
      isVerified : (data?.email_verified_at !== null)
    })
  });
  const socket = useSocket()
  
  const { callStatus } = useCall()

  const dispatch = useDispatch();

  //listen for changes in friend requests
  useEffect(()=>{
    if(socket){
      socket.on('request-received' , (data)=>{
        dispatch(showBadge('pending'));

        dispatch(baseApi.util.invalidateTags(['Requests']))
        toast.info('@'+data.username + ' has sent you a friend request' , {
          theme:'colored',
          position : 'top-right'
        })        
      })

      socket.on('request-deleted' , ()=>{
          dispatch(baseApi.util.invalidateTags(['Requests']))
      })

      
      socket.on('request-accepted' , ({friend} : {friend:Friend})=>{
        dispatch(showBadge('friends'));
        
        if(friend){
          dispatch(baseApi.util.invalidateTags(['Friends'  ,  'Requests' , 'Conversations']))
        }
        
        toast.info('@'+friend.username + ' has accepted your request' , {
          theme:'colored',
          position : 'top-right'
        })
      })

      
      socket.on('friend-removed' , ()=>{
        dispatch(baseApi.util.invalidateTags(['Friends']));
      })

      socket.on('message-received' , ({message} : {message:FriendMessage})=>{
        dispatch(showBadge('conversations'));
        dispatch(openConversation(message.conversation_id))
        dispatch(baseApi.util.invalidateTags(['Messages']))
      })


      socket.on('message-updated' , ()=>{
          dispatch(baseApi.util.invalidateTags(['Messages']))
      })

      socket.on('message-deleted' , ()=>{
          dispatch(baseApi.util.invalidateTags(['Messages']))
      })

      
      socket.on('me-added-to-group' , ()=>{
        dispatch(showBadge('groups'));
        dispatch(baseApi.util.invalidateTags(['groups']))
      })
      
      socket.on('members-added-to-group' , ()=>{
        dispatch(baseApi.util.invalidateTags(['groups']))
      })

      socket.on('member-removed-from-group' , ()=>{
        dispatch(baseApi.util.invalidateTags(['groups']))
      })
      
      socket.on('group-message-received' , ()=>{
        dispatch(baseApi.util.invalidateTags(['groupMessages']))
      })

      socket.on('group-message-updated' , ()=>{
          dispatch(baseApi.util.invalidateTags(['groupMessages']))
      })
      socket.on('group-message-deleted' , ()=>{
          dispatch(baseApi.util.invalidateTags(['groupMessages']))
      })
      
      socket.on('messages-seen' , ()=>{
          dispatch(baseApi.util.invalidateTags(['Messages']))
      })

      
      socket.on('online-status-change' , ()=>{
          dispatch(baseApi.util.invalidateTags(['Friends']));
      })

    }
  },[socket])
 
  const activeSection = useSelector(state=>state.ui.activeSection)
  const renderSections = ()=>{
    if(activeSection.match(/friends/)){
      return <FriendsSection/>    
    }
    else if(activeSection == 'conversations'){
      return <ConversationsSection/>
    }
    else if(activeSection == 'groups'){
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
