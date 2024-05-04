import styles from './FriendsSection.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import useModal from '@/components/modal/useModal';
import SectionContainer from '../SectionContainer';
import FriendsListing from './FriendsListing/FriendsListing';
import BlockedListing from './BlockedListing/BlockedListing';
import PendingFriendsListing from './PendingFriendsListing/PendingFriendsListing';
import { changeActiveSection } from '@/redux/features/UiSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function FriendsSection() {
  const activeSection = useSelector(state=>state.ui.activeSection);
  const notificationBadges = useSelector((state)=>state.ui.notificationBadges);
  const dispatch = useDispatch();
  const {onOpen : onOpenAddFriendModal } = useModal('AddFriendModal');

  const handleAddFriend = ()=>{
      onOpenAddFriendModal(null)
  }
  
  const renderSubSection = ()=>{
    switch(activeSection){
      case 'friends':
        return <FriendsListing/>
      case 'friends/blocked':
        return <BlockedListing/>
      case 'friends/pending':
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

          {/* <div className={styles.search}>
            <input type="text" placeholder='Search...'/>
          </div> */}

          <div className={styles.filters}>
            <UnstyledButton onClick={()=>dispatch(changeActiveSection('friends'))} data-active={activeSection=='friends'}>
              <p>All</p>
              {   
                notificationBadges?.friends && 
                <div className={styles.notification_badge}></div>
              }
            </UnstyledButton>

            <UnstyledButton onClick={()=>dispatch(changeActiveSection('friends/blocked'))}  data-active={activeSection=='friends/blocked'}>
              <p>Blocked</p>
              {   
                notificationBadges?.blocked && 
                <div className={styles.notification_badge}></div>
              }
            </UnstyledButton>
            
            <UnstyledButton onClick={()=>dispatch(changeActiveSection('friends/pending'))}  data-active={activeSection=='friends/pending'}>
              <p>Pending</p>
              {   
                notificationBadges?.pending && 
                <div className={styles.notification_badge}></div>
              }
            </UnstyledButton>
          </div>  
        </div>


        <div className={styles.friends_list}>
          {renderSubSection()}
        </div>

        
        
    </SectionContainer>
  )
}
