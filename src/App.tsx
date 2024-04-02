import styles from './App.module.css';
import {BrowserRouter , Route , Routes , Navigate, Outlet} from 'react-router-dom'
import Application from './components/pages/Application/Application';
import ProfileSettings from './components/pages/ProfileSettings/ProfileSettings';
import Login from './components/pages/Auth/Login/Login';
import Register from './components/pages/Auth/Register/Register';
import { useEffect, useState } from 'react';
import useAuth from './components/hooks/useAuth';
import Loading from './components/shared/Loading/Loading';
import ResetPassword from './components/pages/Auth/ResetPassword/ResetPassword';

import SocketProvider from '@/components/context/SocketProvider';
import { SkeletonTheme } from 'react-loading-skeleton';
import CallProvider from './components/context/CallProvider';
import VideoCallProvider from './components/context/VideoCallProvider';
import FriendsSection from './components/pages/Application/Sections/Friends/FriendsSection';
import ConversationsSection from './components/pages/Application/Sections/Conversations/ConversationsSection';
import GroupsSection from './components/pages/Application/Sections/Groups/GroupsSection';
import ActiveConversation from './components/pages/Application/ActiveConversation/ActiveConversation';

function App() {
  
  return (
    <div className={styles.container}>
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
             
              <Route path='/' element={<Application/>}>
                <Route path='/' element={<FriendsSection/>}></Route>
                <Route path='/conversations' element={<ConversationsSection/>}></Route>
                <Route path='/groups' element={<GroupsSection/>}></Route>
              </Route>
              
              <Route path='/profil' element={<ProfileSettings/>}></Route>          
            </Route>

            <Route path='/login' element={<Login/>}></Route>          
            <Route path='/register' element={<Register/>}></Route>          
            <Route path='/password-reset/:token' element={<ResetPassword/>}></Route>
          </Routes>
        </BrowserRouter>
    
      </SkeletonTheme>
      
    </div>
  )
}


function ProtectedRoute(){
  // if user is authenticated show the component otherwise redirect to login page
  const {isAuth , getAuthenticatedUser} = useAuth()  
  const [isLoading ,setIsLoading] = useState(true)

  useEffect(()=>{
    getAuthenticatedUser()
    .finally(()=>
      setIsLoading(false)
    )
  },[])

  if(isLoading) return <Loading/>

  if(!isAuth) return <Navigate replace to='/login' />

  return( 
    <SocketProvider>
      <CallProvider>
        <VideoCallProvider>
          <Outlet/>      
        </VideoCallProvider>
      </CallProvider>
    </SocketProvider>
  )
} 
export default App
