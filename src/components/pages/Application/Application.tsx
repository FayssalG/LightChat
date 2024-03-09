import ActiveConversation from "./ActiveConversation/ActiveConversation";
import Navbar from "./Navbar/Navbar";
import GroupsSection from "./Sections/Groups/GroupsSection";

export default function Application() {
  return (
    <>
        <Navbar/>
        <GroupsSection/>
        <ActiveConversation/>
    </>
  )
}
