import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmBlockFriend.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeConfirmBlockFriendModal, closeConfirmRemoveFriendModal } from '@/redux/features/UiSlice';

export default function ConfirmBlockFriendModal() {
    const showConfirmBlockFriendModal = useSelector(state=>state.ui.showConfirmBlockFriendModal);
    const dispatch = useDispatch();
    const {shouldRender , animation , onAnimationEnd} = useBiAnimation(showConfirmBlockFriendModal , {enter:'popUp',leave:'popOut'})

    if(!shouldRender) return null
    
    return (
    <div className={styles.container}>
        <div onAnimationEnd={onAnimationEnd} style={{animation}} className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Block Jack Martins</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to block <span>Jack Martins</span> ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn}>Block</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={()=>dispatch(closeConfirmBlockFriendModal())}>Cancel</UnstyledButton>            
            </div>
        </div>
    </div>
  )
}
