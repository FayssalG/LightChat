import styles from './Application.module.css';
import AddFriendModal from "@/components/modals/AddFriendModal/AddFriendModal";
import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import ConversationsSection from "./Sections/Conversations/ConversationsSection";
import FriendsSection from "./Sections/Friends/FriendsSection";
import GroupsSection from "./Sections/Groups/GroupsSection";


import FriendDetailsModal from "@/components/modals/FriendDetailsModal/FriendDetailsModal";
import ConfirmRemoveFriendModal from "@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal";
import ConfirmBlockFriendModal from "@/components/modals/ConfirmBlockFriendModal/ConfirmBlockFriendModal";
import { useSelector } from "react-redux";
import CreateGroupModal from "@/components/modals/CreateGroupModal/CreateGroupModal";
import GroupDetailsModal from "@/components/modals/GroupDetailsModal/GroupDetailsModal";
import EmailNotVerified from '@/components/shared/EmailNotVerified/EmailNotVerified';



export default function Application() {
  const visibleSection : string = useSelector(state=>state.ui.visibleSection)

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
          {selectedSection()}
          <ActiveConversation/>
        </div>        
        
        {/* Modals */}
        <FriendDetailsModal/>
        <GroupDetailsModal/>
        <AddFriendModal/>
        <ConfirmRemoveFriendModal/>
        <ConfirmBlockFriendModal/>
        <CreateGroupModal/>
    </>
  )
}
