import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmRemoveFriend.module.css';
import { useDispatch} from 'react-redux';
import { unFriend } from '@/redux/features/friend/FriendSlice';

import { BaseModal } from '../BaseModal';
import { useUnFriendMutation } from '@/redux/features/friend/friendApi';

export default function ConfirmRemoveFriendModal(props) {
    const [unFriend , {isLoading}] = useUnFriendMutation();
    const {friend , onClose , isOpen} = props
    const dispatch = useDispatch();

    const handleRemove = ()=>{
        onClose();  
        // dispatch(unFriend(friend))
        unFriend(friend.friendship_id)
    }    
    
    
    return (
    <BaseModal show={isOpen} onClose={onClose}>
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Remove {friend.display_name}</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to remove <span>{friend.display_name}</span> from  your friends list ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn} onClick={handleRemove}>Remove</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={onClose}>Cancel</UnstyledButton>            
            </div>
        </div>
    </BaseModal>
  )
}
