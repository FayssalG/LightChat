import styles from './App.module.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom'

import Application from './components/pages/Application/Application';
import ProfileSettings from './components/pages/ProfileSettings/ProfileSettings';

function App() {  
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Application/>}></Route>
          <Route path='/profil' element={<ProfileSettings/>}></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
