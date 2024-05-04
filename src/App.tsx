import styles from './App.module.css';
import {BrowserRouter , Route , Routes , Navigate, Outlet} from 'react-router-dom'
import ProfileSettings from './components/pages/ProfileSettings/ProfileSettings';
import Login from './components/pages/Auth/Login/Login';
import Register from './components/pages/Auth/Register/Register';
import { useEffect, useState } from 'react';
import Loading from './components/shared/Loading/Loading';
import ResetPassword from './components/pages/Auth/ResetPassword/ResetPassword';

import SocketProvider from '@/components/context/SocketProvider';
import { SkeletonTheme } from 'react-loading-skeleton';

import CallProvider from './components/context/CallProvider/CallProvider';
import { useSelector} from 'react-redux';


import {useLazyGetUserQuery, useRefreshTokenMutation } from './redux/features/auth/authApi';
import {useLazyGetFriendsQuery } from './redux/features/friend/friendApi';
import {useLazyGetBlockedUsersQuery } from './redux/features/block/blockApi';
import {useLazyGetConversationsQuery, useLazyGetMessagesQuery } from './redux/features/Conversation/conversationApi';
import { useLazyGetFriendRequestsQuery } from './redux/features/friendRequest/friendRequestApi';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { Slide, ToastContainer } from 'react-toastify';
import { useLazyGetGroupsQuery } from './redux/features/group/groupApi';
import {useLazyGetGroupMessagesQuery} from './redux/features/Conversation/groupConversationApi';
import ActiveGroupConversation from './components/pages/Dashboard/ActiveGroupConversation/ActiveGroupConversation';
import ActiveConversation from './components/pages/Dashboard/ActiveConversation/ActiveConversation';
import NotFound from './components/pages/NotFound/NotFound';

function App() {
  
  return (
    <div className={styles.container}>
      <ToastContainer
          autoClose={2500}
          theme='dark'
          transition={Slide}
      />

      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
             
              <Route path='/' element={<Dashboard/>}>
                <Route path='/group/:convId' element={<ActiveGroupConversation/>}></Route>            
                <Route path='/friend/:convId' element={<ActiveConversation/>}></Route>            
              </Route>              
              <Route path='/profil' element={<ProfileSettings/>}></Route>          
            </Route>

            <Route path='/login' element={<Login/>}></Route>          
            <Route path='/register' element={<Register/>}></Route>          
            <Route path='/password-reset/:token' element={<ResetPassword/>}></Route>
            <Route path='/*' element={<NotFound/>}></Route>          

          </Routes>
        </BrowserRouter>
    
      </SkeletonTheme>
      
    </div>
  )
}


function ProtectedRoute(){
  const token = useSelector(state=>state.auth.token);  
  
  const [refreshToken] = useRefreshTokenMutation();
  
  const [getUser] = useLazyGetUserQuery();
  const [getFriendRequests] = useLazyGetFriendsQuery();
  const [getFriends ] = useLazyGetFriendRequestsQuery();
  const [getGroups ] = useLazyGetGroupsQuery();
  const [getGroupMessages] = useLazyGetGroupMessagesQuery();
  const [getBlockedUsers ] = useLazyGetBlockedUsersQuery();
  const [getConversations  ] = useLazyGetConversationsQuery();
  const [getMessages ] = useLazyGetMessagesQuery();
  
  const [isLoadingAll , setIsLoadingAll] = useState(true)

  useEffect(()=>{
    if(token){
      const tokenExpiry = token.expires_in + token.created_at; //in seconds
      const now = Date.now() / 1000; // in seconds
      if(tokenExpiry - now <= 1 ) refreshToken(undefined);  
    }

   if(token){
      Promise.all([
        getUser(undefined),
        getFriends(undefined),
        getGroups(undefined),
        getGroupMessages(undefined),
        getFriendRequests(undefined),
        getConversations(undefined),
        getMessages(undefined),
        getBlockedUsers(undefined)
      ])
      .finally(()=>{
        setIsLoadingAll(false)
      })
   }
  },[token])

  // if user is authenticated show the component otherwise redirect to login page
  if(!token) return <Navigate replace to='/login' />

  if(isLoadingAll) return <Loading/>

  
  return( 
    <SocketProvider>
      <CallProvider>
          <Outlet/>      
      </CallProvider>
    </SocketProvider>
  )
} 
export default App
