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
import { setFriends, setIsLoadingFriend, setPendingFriends } from '@/redux/features/FriendSlice';



export default function Application() {
  const visibleSection : string = useSelector(state=>state.ui.visibleSection)
  const isVerified : Boolean = useSelector(state => state.auth.isVerified);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchFriends = async ()=>{
      const res1 = await get_friend_requests()
      if(res1.status == 200) dispatch(setPendingFriends(res1.data));
      const res2 = await  get_friends()
      if (res2.status === 200) dispatch(setFriends(res2.data));      
    }

    dispatch(setIsLoadingFriend(true))
    
    fetchFriends()
    .catch((err)=>console.log(err))
    .finally(()=>dispatch(setIsLoadingFriend(false)))
  })

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
        <GroupDetailsModal/>
        <AddFriendModal/>
        <ConfirmBlockFriendModal/>
        <CreateGroupModal/>
    </>
  )
}
