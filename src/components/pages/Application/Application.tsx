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
        {
            selectedSection()
        }
        <ActiveConversation/>

        {/* Modals */}
        <FriendDetailsModal/>
        <AddFriendModal/>
        <ConfirmRemoveFriendModal/>
        <ConfirmBlockFriendModal/>
        <CreateGroupModal/>
    </>
  )
}
