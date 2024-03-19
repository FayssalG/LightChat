import styles from './Blocked.module.css';

import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useDispatch } from 'react-redux';
import { openConfirmRemoveFriendModal } from '@/redux/features/UiSlice';
import { unblock_user } from '@/axios/friend';
import { removeBlockedUser, setIsLoadingFriend } from '@/redux/features/FriendSlice';


export default function Blocked({blocked}) {
  const dispatch = useDispatch()

  const handleUnblock = ()=>{
    dispatch(setIsLoadingFriend(true))
    unblock_user(blocked.username)
    .then((res)=>{
      if(res.status == 200){
        dispatch(removeBlockedUser(blocked.block_id));
      }
    })
    .finally(()=>{
      dispatch(setIsLoadingFriend(false))
    })
  }

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
