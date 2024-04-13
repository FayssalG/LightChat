import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmDeleteMessage.module.css';
import { BaseModal } from '../BaseModal';
import { useDeleteMessageMutation } from '@/redux/features/Conversation/conversationApi';

export default function ConfirmDeleteMessageModal(props) {
    const [deleteMessage , {isLoading}] = useDeleteMessageMutation();
    const {message , onClose , isOpen} = props  

    const handleDelete = ()=>{
        onClose();
        deleteMessage(message.id);
    }    
    

    
    return (
    <BaseModal show={isOpen}  onClose={onClose} >
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Delete Message</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to delete this message  ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn} onClick={handleDelete}>Delete</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={onClose}>Cancel</UnstyledButton>            
            </div>
        </div>
    </BaseModal>
  )
}
