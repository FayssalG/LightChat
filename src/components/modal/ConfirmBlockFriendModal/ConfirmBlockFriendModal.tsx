import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmBlockFriend.module.css';
import { useDispatch} from 'react-redux';
import { BaseModal } from '../BaseModal';
import { setFriendAsBlocked } from '@/redux/features/friend/FriendSlice';
import { useBlockUserMutation } from '@/redux/features/block/blockApi';

export default function ConfirmBlockFriendModal(props) {
    const [blockUser , {isLoading}] = useBlockUserMutation();
    const {friend , onClose , isOpen} = props  

    const dispatch = useDispatch();

    const handleBlock = ()=>{
        onClose();
        blockUser(friend.username);
    }    
    

    
    return (
    <BaseModal show={isOpen}  onClose={onClose} >
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Block {friend.display_name}</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to block <span>{friend.display_name}</span> ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn} onClick={handleBlock}>Block</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={onClose}>Cancel</UnstyledButton>            
            </div>
        </div>
    </BaseModal>
  )
}
