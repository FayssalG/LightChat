import styles from './App.module.css';
import Navbar from './components/Navbar/Navbar'
import FriendsSection from './components/Sections/Friends/FriendsSection'


function App() {
  
  return (
    <div className={styles.container}>
      <Navbar/>
    
        <FriendsSection/>
    </div>
  )
}

export default App
