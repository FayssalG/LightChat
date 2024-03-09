import styles from './App.module.css';

import Application from './components/pages/Application/Application';
import ProfileSettings from './components/pages/ProfileSettings/ProfileSettings';

function App() {  
  return (
    <div className={styles.container}>
      {/* <Application/> */}
      <ProfileSettings/>
    </div>
  )
}

export default App
