import styles from './FriendsSection.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { openAddFriendModal } from '@/redux/features/UiSlice';
import { useEffect, useState } from 'react';
import { get_friends, get_pending_friends} from '@/axios/friend';
import { setFriends , setPendingFriends} from '@/redux/features/FriendSlice';
import PendingFriendsListing from './PendingFriendsListing/PendingFriendsListing';
import FriendsListing from './FriendsListing/FriendsListing';
import Spinner from '@/components/shared/Spinner/Spinner';
import BlockedListing from './BlockedListing/BlockedListing';

export default function FriendsSection() {
  const isLoadingFriend = useSelector(state=>state.friend.isLoadingFriend);
  const dispatch = useDispatch();  
  const [selected , setSelected] : [string , Function]= useState('all');

  const renderListings = ()=>{
    switch(selected){
      case 'all':
        return <FriendsListing/>
      case 'pending':
        return <PendingFriendsListing/>
      case 'blocked':
        return <BlockedListing/>

    }
  }
  
  
  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title_addbtn}>
            <h1 >Friends</h1>
            <UnstyledButton onClick={()=>dispatch(openAddFriendModal())}>Add Friend</UnstyledButton>
          </div>

          <div className={styles.search}>
            <input type="text" placeholder='Search...'/>
          </div>

          <div className={styles.filters}>
            <UnstyledButton onClick={()=>setSelected('all')} data-active={selected=='all' ? true : false}>All</UnstyledButton>
            <UnstyledButton onClick={()=>setSelected('blocked')} data-active={selected=='blocked' ? true : false}>Blocked</UnstyledButton>
            <UnstyledButton onClick={()=>setSelected('pending')} data-active={selected=='pending' ? true : false}>Pending</UnstyledButton>
          </div>  
        </div>


        <div className={styles.friends_list}>
          {renderListings()}
        </div>

        {
          isLoadingFriend &&        
          
          <div className={styles.loading_overlay}>
            <Spinner size={25}/>
          </div>
        }

        
    </div>
  )
}
