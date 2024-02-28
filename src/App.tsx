import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import ConversationsSection from './components/Sections/Conversations/ConversationsSection';
import FriendsSection from './components/Sections/Friends/FriendsSection';
import GroupsSection from './components/Sections/Groups/GroupsSection';

import ActiveConversation from './components/ActiveConversation/ActiveConversation';
function App() {
  
  return (
    <div className={styles.container}>
      <Navbar/>
    
        {/* <FriendsSection/> */}
        {/* <ConversationsSection/> */}
        <GroupsSection/>
      <ActiveConversation/>
    </div>
  )
}

export default App
