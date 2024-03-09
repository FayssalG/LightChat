import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import FriendsSection from "./Sections/Friends/FriendsSection";
import GroupsSection from "./Sections/Groups/GroupsSection";

export default function Application() {
  return (
    <>
        <Navbar/>
        <FriendsSection/>
        <ActiveConversation/>
    </>
  )
}
