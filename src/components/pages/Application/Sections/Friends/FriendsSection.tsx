import styles from './FriendsSection.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useState } from 'react';
import useModal from '@/components/modal/useModal';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SectionContainer from '../SectionContainer';
import FriendsListing from './FriendsListing/FriendsListing';
import BlockedListing from './BlockedListing/BlockedListing';
import PendingFriendsListing from './PendingFriendsListing/PendingFriendsListing';

export default function FriendsSection() {
  const {onOpen : onOpenAddFriendModal } = useModal('AddFriendModal');
  const [activeSubSection , setActiveSubSection] = useState('all');


  const handleAddFriend = ()=>{
      onOpenAddFriendModal(null)
  }

  
  const renderSubSection = ()=>{
    switch(activeSubSection){
      case 'all':
        return <FriendsListing/>
      case 'blocked':
        return <BlockedListing/>
      case 'pending':
        return <PendingFriendsListing/>  
    }
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
            <UnstyledButton onClick={()=>setActiveSubSection('all')} data-active={activeSubSection=='all' ? true : false}>All</UnstyledButton>
            <UnstyledButton onClick={()=>setActiveSubSection('blocked')}  data-active={activeSubSection=='blocked' ? true : false}>Blocked</UnstyledButton>
            <UnstyledButton onClick={()=>setActiveSubSection('pending')}  data-active={activeSubSection=='pending' ? true : false}>Pending</UnstyledButton>
          </div>  
        </div>


        <div className={styles.friends_list}>
          {renderSubSection()}
        </div>

        
        
    </SectionContainer>
  )
}
