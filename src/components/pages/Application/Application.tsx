import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import ConversationsSection from "./Sections/Conversations/ConversationsSection";
import FriendsSection from "./Sections/Friends/FriendsSection";
import GroupsSection from "./Sections/Groups/GroupsSection";
import FriendDetailsModal from "./ActiveConversation/FriendDetailsModal/FriendDetailsModal";

import { useSelector } from "react-redux";


export default function Application() {
  const showFriendDetailsModal = useSelector(state=>state.ui.showFriendDetailsModal);

  return (
    <>
        <Navbar/>
        <GroupsSection/>
        <ActiveConversation/>

        {/* Modals */}
        { showFriendDetailsModal ?  <FriendDetailsModal/> : null }

    </>
  )
}
