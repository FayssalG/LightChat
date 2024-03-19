import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmRemoveFriend.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeConfirmRemoveFriendModal, closeFriendDetailsModal } from '@/redux/features/UiSlice';
import { remove_friend } from '@/axios/friend';
import { removeFriend, setIsLoadingFriend } from '@/redux/features/FriendSlice';

export default function ConfirmRemoveFriendModal() {
    const selectedFriend : Friend = useSelector(state=>state.friend.selectedFriend);
    const showConfirmRemoveFriendModal = useSelector(state=>state.ui.showConfirmRemoveFriendModal);
    const dispatch = useDispatch();
    const {shouldRender , animation , onAnimationEnd} = useBiAnimation(showConfirmRemoveFriendModal , {enter:'popUp',leave:'popOut'})

    console.log({selectedFriend});
    
    const handleRemove = ()=>{
        dispatch(setIsLoadingFriend(true));
        dispatch(closeConfirmRemoveFriendModal())
        remove_friend(selectedFriend.friendship_id)
        .then((res)=>{
          if (res.status === 200){
            dispatch(closeFriendDetailsModal());
            dispatch(removeFriend(selectedFriend.friendship_id))
          }
        })        
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          dispatch(setIsLoadingFriend(false));
        })
      }    
    
    // if(!selectedFriend) return null

    if(!shouldRender) return null
  
    return (
    <div className={styles.container}>
        <div onAnimationEnd={onAnimationEnd} style={{animation}} className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Remove {selectedFriend.display_name}</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to remove <span>{selectedFriend.display_name}</span> from  your friends list ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn} onClick={handleRemove}>Remove</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={()=>dispatch(closeConfirmRemoveFriendModal())}>Cancel</UnstyledButton>            
            </div>
        </div>
    </div>
  )
}
