import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmRemoveFriend.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeConfirmRemoveFriendModal } from '@/redux/features/UiSlice';

export default function ConfirmRemoveFriendModal() {
    const showConfirmRemoveFriendModal = useSelector(state=>state.ui.showConfirmRemoveFriendModal);
    const dispatch = useDispatch();
    const {shouldRender , animation , onAnimationEnd} = useBiAnimation(showConfirmRemoveFriendModal , {enter:'popUp',leave:'popOut'})

    if(!shouldRender) return null
    return (
    <div className={styles.container}>
        <div onAnimationEnd={onAnimationEnd} style={{animation}} className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Remove Jack Martins</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to remove <span>Jack Martins</span> from  your friends list ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn}>Remove</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={()=>dispatch(closeConfirmRemoveFriendModal())}>Cancel</UnstyledButton>            
            </div>
        </div>
    </div>
  )
}
