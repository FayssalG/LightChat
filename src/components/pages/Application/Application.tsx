import styles from './Application.module.css';
import AddFriendModal from "@/components/modals/AddFriendModal/AddFriendModal";
import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import ConversationsSection from "./Sections/Conversations/ConversationsSection";
import FriendsSection from "./Sections/Friends/FriendsSection";
import GroupsSection from "./Sections/Groups/GroupsSection";


import FriendDetailsModal from "@/components/modals/FriendDetailsModal/FriendDetailsModal";
import ConfirmBlockFriendModal from "@/components/modals/ConfirmBlockFriendModal/ConfirmBlockFriendModal";
import { useDispatch, useSelector } from "react-redux";
import CreateGroupModal from "@/components/modals/CreateGroupModal/CreateGroupModal";
import GroupDetailsModal from "@/components/modals/GroupDetailsModal/GroupDetailsModal";
import EmailNotVerified from '@/components/pages/Application/EmailNotVerified/EmailNotVerified';
import { useEffect } from 'react';
import { get_friend_requests, get_friends } from '@/axios/friend';
import { addFriend, addRequest , removeFriend, removeRequest, setFriends, setIsLoadingFriend, setRequests } from '@/redux/features/FriendSlice';
import { useSocket } from '@/components/context/SocketProvider';
import ConfirmRemoveFriendModal from '@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal';



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

      socket.on('friend-removed' , (data)=>{
        if(data){
          dispatch(removeFriend(data));
        }
      })

    }
  },[socket])


  useEffect(()=>{
    const fetchFriends = async ()=>{
      const res1 = await get_friend_requests()
      if(res1.status == 200) dispatch(setRequests(res1.data));
      const res2 = await  get_friends()
      if (res2.status === 200) dispatch(setFriends(res2.data));      
    }
    dispatch(setIsLoadingFriend(true))
    
    fetchFriends()
    .catch((err)=>console.log(err))
    .finally(()=>dispatch(setIsLoadingFriend(false)))
  },[])

 

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
        
        
        
        {/* Modals */}
        <FriendDetailsModal/>
        <ConfirmRemoveFriendModal/>
        <GroupDetailsModal/>
        <AddFriendModal/>
        <ConfirmBlockFriendModal/>
        <CreateGroupModal/>
          
    </>
  )
}
