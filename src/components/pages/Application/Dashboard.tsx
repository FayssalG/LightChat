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
import { Outlet } from 'react-router-dom';
import { useCall } from '@/components/context/CallProvider/CallProvider';
import {useGetConversationsQuery } from '@/redux/features/Conversation/conversationApi';
import { baseApi } from '@/redux/features/baseApi';
import { openConversation } from '@/redux/features/Conversation/ConversationSlice';
import { useGetUserQuery } from '@/redux/features/auth/authApi';

export default function Dashboard() {
  const {isVerified} : {isVerified : Boolean} = useGetUserQuery(undefined , {
    selectFromResult : ({data})=>({
      isVerified : (data?.email_verified_at !== null)
    })
  });
  const socket = useSocket()
  
  const activeConversationId = useSelector(state=>state.conversation.activeConversationId) 
  const {activeConversation , isFetching} = useGetConversationsQuery(undefined , {
    selectFromResult : ({data,isFetching})=>({
      isFetching,
      activeConversation : data?.find(c=>c.conversation_id==activeConversationId)
    })
  });

  const {callStatus}= useCall()

  const dispatch = useDispatch();


  //listen for changes in friend requests
  useEffect(()=>{
    if(socket){
      socket.on('request-received' , (data)=>{
        dispatch(baseApi.util.invalidateTags(['Requests']))        
      })

      socket.on('request-deleted' , (data)=>{
          dispatch(baseApi.util.invalidateTags(['Requests']))
      })

      
      socket.on('request-accepted' , (data)=>{
        if(data){
          dispatch(baseApi.util.invalidateTags(['Friends'  ,  'Requests' , 'Conversations']))
        }
      })

      
      socket.on('friend-removed' , (frinedshipId : string)=>{
        console.log(frinedshipId)
        dispatch(baseApi.util.invalidateTags(['Friends']));
      })


      socket.on('message-received' , ({message , sender} : {message:FriendMessage , sender:Friend})=>{
        if(message){
          dispatch(openConversation(message.conversation_id))
          dispatch(baseApi.util.invalidateTags(['Messages']))
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
              <Outlet/>
            </div>          

              <div className={styles.active_conversation}>
                  {
                    activeConversation &&
                    <ActiveConversation 
                      isFetching={isFetching} 
                      activeConversation={activeConversation}
                    />               
                  }
              </div>          
            
            <div className={styles.voice_call}>
                {['calling' , 'ongoing'].includes(callStatus.audio) && <VoiceCall />}
                {['calling' , 'ongoing'].includes(callStatus.video)  && <VideoCall/>}
            </div>                    
        </div>        

    </div>
  )
}
