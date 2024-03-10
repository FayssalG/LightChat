import AddFriendModal from "@/components/modals/AddFriendModal/AddFriendModal";
import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import ConversationsSection from "./Sections/Conversations/ConversationsSection";
import FriendsSection from "./Sections/Friends/FriendsSection";
import GroupsSection from "./Sections/Groups/GroupsSection";


import FriendDetailsModal from "@/components/modals/FriendDetailsModal/FriendDetailsModal";
import ConfirmRemoveFriendModal from "@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal";
import ConfirmBlockFriendModal from "@/components/modals/ConfirmBlockFriendModal/ConfirmBlockFriendModal";



export default function Application() {

  return (
    <>
        <Navbar/>
        <FriendsSection/>
        <ActiveConversation/>

        {/* Modals */}
        <FriendDetailsModal/>
        <AddFriendModal/>
        <ConfirmRemoveFriendModal/>
        <ConfirmBlockFriendModal/>
    </>
  )
}
