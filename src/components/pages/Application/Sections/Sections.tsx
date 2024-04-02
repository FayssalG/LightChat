import { Routes , Route, BrowserRouter} from "react-router-dom";
import FriendsSection from "./Friends/FriendsSection";
import GroupsSection from "./Groups/GroupsSection";
import ConversationsSection from "./Conversations/ConversationsSection";

export default function Sections() {
  return (
    <>
        <Routes>
            <Route path="/friends" element={<FriendsSection/>}></Route>
            <Route path="/conversations" element={<ConversationsSection/>}></Route>
            <Route path="/groups" element={<GroupsSection/>}></Route>
        </Routes>
    </>
  )
}
