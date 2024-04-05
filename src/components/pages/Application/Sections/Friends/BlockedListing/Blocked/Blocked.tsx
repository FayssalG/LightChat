import styles from './Blocked.module.css';

import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { unBlockUser } from '@/redux/features/Block/BlockSlice';
import FriendSkeleton from '../../FriendSkeleton/FriendSkeleton';


export default function Blocked({blocked}) {
  const unBlockStatus : string = useSelector(state=>state.block.unBlockStatus);
  const isLoading = unBlockStatus == 'loading' ; 
  const dispatch = useDispatch();

  const handleUnblock = ()=>{
    dispatch(unBlockUser(blocked))
  }

  if(isLoading) return <FriendSkeleton/>
  
  return (
    <>
         <div className={styles.friend}>
              <div className={styles.picture}>
                <img src={blocked.image} alt="avatar" />
              </div>

              <UnstyledButton className={styles.displayname_username}>
                  <h2 className={styles.displayname}>{blocked.display_name}</h2>
                  <p className={styles.username}>online</p>
              </UnstyledButton>
    
              <UnstyledButton className={styles.unblock_btn} onClick={handleUnblock}>
                Unblock
              </UnstyledButton>


          </div>

    </>
  )
}
