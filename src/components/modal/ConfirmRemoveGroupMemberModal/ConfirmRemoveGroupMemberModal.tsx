import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmRemoveGroupMemberModal.module.css';

import { BaseModal } from '../BaseModal';
import {  useRemoveMemberMutation } from '@/redux/features/group/groupApi';

export default function ConfirmRemoveGroupMemberModal(props) {
    const [removeMember ] = useRemoveMemberMutation();
    const {group, member , onClose , isOpen} = props

    const handleRemoveMember = ()=>{
        onClose();  
        removeMember({group_id:group.id,member_id:member.id});
    }    
    
    
    return (
    <BaseModal show={isOpen} onClose={onClose}>
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Quit {group.name}</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to remove <span>{member.display_name} </span> from <span>"{group.name}"</span> group ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn} onClick={handleRemoveMember}>Remove</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={onClose}>Cancel</UnstyledButton>            
            </div>
        </div>
    </BaseModal>
  )
}
