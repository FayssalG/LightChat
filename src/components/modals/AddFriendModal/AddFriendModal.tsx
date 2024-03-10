import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './AddFriendModal.module.css';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeAddFriendModal } from '@/redux/features/UiSlice';

export default function AddFriendModal() { 
  const showAddFriendModal = useSelector((state)=>state.ui.showAddFriendModal);
  const dispatch = useDispatch();
    
  const {shouldRender , animation , onAnimationEnd} = useBiAnimation(showAddFriendModal,{enter:'popUp' , leave:'popOut'});
 
  if(!shouldRender) return null
  return (
    <div className={styles.container}>
        <div onAnimationEnd={onAnimationEnd} style={{animation:animation}} className={styles.inner_container}>
            <UnstyledButton onClick={()=>dispatch(closeAddFriendModal())} className={styles.close}>
                <IoClose/>
            </UnstyledButton>
            <form>
                <input placeholder='Type a username...' />
                <UnstyledButton>Send Friend Request</UnstyledButton>
            </form>
        </div>
    </div>

  )
}
