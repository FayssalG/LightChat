import styles from './PendingFriend.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { useAcceptRequestMutation, useCancelRequestMutation, useIgnoreRequestMutation } from '@/redux/features/friendRequest/friendRequestApi';
import LoadingSkeleton from '../../../LoadingSkeleton/LoadingSkeleton';


export default function PendingFriend({pendingFriend} : {pendingFriend:FriendRequest}  ) {
  const [acceptRequest ] = useAcceptRequestMutation();
  const [cancelRequest ] = useCancelRequestMutation();
  const [ignoreRequest ] = useIgnoreRequestMutation();
  const isLoading = false;
  const user = useSelector(state=>state.auth.user);
  
  
  
  const handleAccept = ()=>{  
    acceptRequest(pendingFriend.request_id);
  }

  const handleIgnore = ()=>{
    ignoreRequest(pendingFriend.request_id)
  }

  const handleCancel = ()=>{
    cancelRequest(pendingFriend.request_id)
  }
 
  

  const renderActions = ()=>{
    if(pendingFriend.sender_id == user.id){
      return (
        <UnstyledButton title='Cancel' className={styles.cancel_btn} onClick={handleCancel}>
          <IoClose/>
        </UnstyledButton>
      )
    } 
    else{
      return(
        <div className={styles.accept_ignore} >
          <UnstyledButton className={styles.accept_btn} onClick={handleAccept}>
              Accept
          </UnstyledButton>
          <UnstyledButton className={styles.ignore_btn} onClick={handleIgnore}>
              Ignore
          </UnstyledButton>
        </div> 
      )
    }
  }

  if(isLoading) return <LoadingSkeleton/>
  
  return (
    <>
         <div className={styles.friend}>
              <div className={styles.picture}>
                <img src={pendingFriend.image} alt="avatar" />
              </div>

              <div className={styles.displayname_username}>
                <UnstyledButton className={styles.displayname}>
                    {pendingFriend.display_name}
                </UnstyledButton>
                <UnstyledButton className={styles.username}>
                    @{pendingFriend.username}
                </UnstyledButton>
          
              </div>

              {renderActions()}
          </div>
    </>
  )
}
