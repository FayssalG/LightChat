import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmBlockFriend.module.css';
import { useDispatch} from 'react-redux';
import { removeFriend } from '@/redux/features/FriendSlice';
import { addBlockedUser } from '@/redux/features/FriendSlice';
import { block_user } from '@/axios/friend';
import { BaseModal } from '../BaseModal';

export default function ConfirmBlockFriendModal(props) {
  const {friend , onClose , isOpen} = props  

    const dispatch = useDispatch();

    const handleBlock = ()=>{
        onClose();
        block_user(friend.username)
        .then((res)=>{
          if (res.status === 200){
            dispatch(addBlockedUser(res.data));
            dispatch(removeFriend(friend.friendship_id))
            onClose()
          }
        })        
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
        
        })

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
