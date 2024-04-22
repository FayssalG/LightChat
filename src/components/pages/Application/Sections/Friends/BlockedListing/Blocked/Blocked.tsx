import styles from './Blocked.module.css';

import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { unBlockUser } from '@/redux/features/block/blockSlice';
import { useUnBlockUserMutation } from '@/redux/features/block/blockApi';
import LoadingSkeleton from '../../../LoadingSkeleton/LoadingSkeleton';


export default function Blocked({blocked}) {
  const [unBlockUser , {isLoading}] = useUnBlockUserMutation();
  

  const handleUnblock = ()=>{
    unBlockUser(blocked.username)
  }

  if(isLoading) return <LoadingSkeleton/>
  
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
