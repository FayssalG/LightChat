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

import VideoCallProvider from './components/context/VideoCallProvider';
import FriendsSection from './components/pages/Application/Sections/Friends/FriendsSection';
import ConversationsSection from './components/pages/Application/Sections/Conversations/ConversationsSection';
import GroupsSection from './components/pages/Application/Sections/Groups/GroupsSection';
import CallProvider from './components/context/CallProvider/CallProvider';
import { useDispatch} from 'react-redux';


import { useGetUserQuery, useLazyGetUserQuery } from './redux/features/auth/authApi';
import { useGetFriendsQuery, useLazyGetFriendsQuery } from './redux/features/friend/friendApi';
import { useGetBlockedUsersQuery, useLazyGetBlockedUsersQuery } from './redux/features/block/blockApi';
import { useGetConversationsQuery, useGetMessagesQuery, useLazyGetConversationsQuery, useLazyGetMessagesQuery } from './redux/features/Conversation/conversationApi';
import { useGetFriendRequestsQuery, useLazyGetFriendRequestsQuery } from './redux/features/friendRequest/friendRequestApi';
import FriendsListing from './components/pages/Application/Sections/Friends/FriendsListing/FriendsListing';
import PendingFriendsListing from './components/pages/Application/Sections/Friends/PendingFriendsListing/PendingFriendsListing';
import BlockedListing from './components/pages/Application/Sections/Friends/BlockedListing/BlockedListing';
import Dashboard from './components/pages/Application/Dashboard';

function App() {
  
  return (
    <div className={styles.container}>
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
             
              <Route path='/' element={<Dashboard/>}>
                <Route path='/friends' element={<FriendsSection/>}>
                  <Route path='/friends' element={<FriendsListing/>}></Route>
                  <Route path='/friends/pending' element={<PendingFriendsListing/>}></Route>
                  <Route path='/friends/blocked' element={<BlockedListing/>}></Route>
                </Route>
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
  const {data:user,isLoading:isLoadingUser} = useGetUserQuery(undefined);
  const {isLoading:isLoadingFriends} = useGetFriendsQuery(undefined);
  const {isLoading:isLoadingRequests} = useGetFriendRequestsQuery(undefined);
  const {isLoading:isLoadingBlocks} = useGetBlockedUsersQuery(undefined);
  const {isLoading:isLoadingConversations} = useGetConversationsQuery(undefined);
  const {isLoading:isLoadingMessages} = useGetMessagesQuery(undefined);
  console.log({user})
  // const [getFriendRequests, {isLoading:isLoadingFriends}] = useLazyGetFriendsQuery();
  // const [getFriends , {isLoading:isLoadingRequests}] = useLazyGetFriendRequestsQuery();
  // const [getBlockedUsers , {isLoading:isLoadingBlocks}] = useLazyGetBlockedUsersQuery();
  // const [getConversations , {isLoading:isLoadingConversations}] = useLazyGetConversationsQuery();
  // const [getMessages , {isLoading:isLoadingMessages}] = useLazyGetMessagesQuery();
  
  const dispatch = useDispatch()
  // const isAuth = useSelector(state=>state.auth.isAuth)
  const isLoading = isLoadingFriends || isLoadingConversations 
  || isLoadingBlocks || isLoadingMessages || isLoadingUser || isLoadingRequests;

  useEffect(()=>{
    if(user){
      // getFriends(undefined);
      // getFriendRequests(undefined);
      // getBlockedUsers(undefined);
      // getConversations(undefined)
      // getMessages(undefined)
      // dispatch(fetchFriends());
      // dispatch(fetchRequests())
      // dispatch(fetchBlockedUsers());
      // dispatch(fetchConversations());
      // dispatch(fetchMessages());
    }
    else{
      // dispatch(clearFriends())
      // dispatch(clearRequests())
      // dispatch(clearConversations())
      // dispatch(clearBlockedUsers())
   }

  },[dispatch , user])

  // if user is authenticated show the component otherwise redirect to login page
  if(isLoading) return <Loading/>

  if(!user) return <Navigate replace to='/login' />


  
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
