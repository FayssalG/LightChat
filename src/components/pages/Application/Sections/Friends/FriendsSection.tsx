import styles from './FriendsSection.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useState } from 'react';
import useModal from '@/components/modal/useModal';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SectionContainer from '../SectionContainer';

export default function FriendsSection() {
  const {pathname} = useLocation();
  const {onOpen : onOpenAddFriendModal } = useModal('AddFriendModal');

  const handleAddFriend = ()=>{
      onOpenAddFriendModal(null)
  }

  
  
  return (
    <SectionContainer>
        <div className={styles.header}>
          <div className={styles.title_addbtn}>
            <h1>Friends</h1>
            <UnstyledButton onClick={handleAddFriend}>Add Friend</UnstyledButton>
          </div>

          <div className={styles.search}>
            <input type="text" placeholder='Search...'/>
          </div>

          <div className={styles.filters}>
            <Link to='/friends' data-active={pathname=='/friends' ? true : false}>All</Link>
            <Link to='/friends/blocked' data-active={pathname=='/friends/blocked' ? true : false}>Blocked</Link>
            <Link to='/friends/pending' data-active={pathname=='/friends/pending' ? true : false}>Pending</Link>
          </div>  
        </div>


        <div className={styles.friends_list}>
          <Outlet/>            
        </div>

        
        
    </SectionContainer>
  )
}
