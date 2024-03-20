import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmBlockFriend.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeConfirmBlockFriendModal, closeConfirmRemoveFriendModal } from '@/redux/features/UiSlice';
import { addBlockedUser, removeFriend, setIsLoadingFriend } from '@/redux/features/FriendSlice';
import { block_user } from '@/axios/friend';

export default function ConfirmBlockFriendModal() {
    const selectedFriend : Friend = useSelector(state=>state.friend.selectedFriend);
    const isLoadingFriend : Boolean = useSelector(state=>state.friend.isLoadingFriend);
    const showConfirmBlockFriendModal = useSelector(state=>state.ui.showConfirmBlockFriendModal);
    const dispatch = useDispatch();
    const {shouldRender , animation , onAnimationEnd} = useBiAnimation(showConfirmBlockFriendModal , {enter:'popUp',leave:'popOut'})

    const handleBlock = ()=>{
        dispatch(setIsLoadingFriend(true));
        dispatch(closeConfirmBlockFriendModal())

        block_user(selectedFriend.username)
        .then((res)=>{
          if (res.status === 200){
            dispatch(addBlockedUser(res.data));
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
    

    if(!shouldRender) return null
    
    return (
    <div className={styles.container}>
        <div onAnimationEnd={onAnimationEnd} style={{animation}} className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Block {selectedFriend.display_name}</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to block <span>{selectedFriend.display_name}</span> ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn} onClick={handleBlock}>Block</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={()=>dispatch(closeConfirmBlockFriendModal())}>Cancel</UnstyledButton>            
            </div>
        </div>
    </div>
  )
}
