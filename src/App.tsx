import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import FriendsSection from './components/Sections/Friends/FriendsSection';
import ActiveConversation from './components/ActiveConversation/ActiveConversation';

function App() {
  
  return (
    <div className={styles.container}>
      <Navbar/>
    
        <FriendsSection/>
      <ActiveConversation/>
    </div>
  )
}

export default App
