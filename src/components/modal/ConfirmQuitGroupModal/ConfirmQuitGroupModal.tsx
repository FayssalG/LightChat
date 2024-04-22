import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ConfirmQuitGroupModal.module.css';
import { useDispatch} from 'react-redux';

import { BaseModal } from '../BaseModal';
import { useQuitGroupMutation } from '@/redux/features/group/groupApi';

export default function ConfirmQuitGroupModal(props) {
    const [quitGroup ] = useQuitGroupMutation();
    const {group , onClose , isOpen} = props

    const handleQuit = ()=>{
        onClose();  
        quitGroup({group_id:group.id});
    }    
    
    
    return (
    <BaseModal show={isOpen} onClose={onClose}>
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <h3>Quit {group.name}</h3>
            </div>

            <div className={styles.body}>
                <p>
                    Do you really want to quit <span>{group.name}</span> group ?
                </p>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.remove_btn} onClick={handleQuit}>Quit</UnstyledButton>
                <UnstyledButton className={styles.cancel_btn} onClick={onClose}>Cancel</UnstyledButton>            
            </div>
        </div>
    </BaseModal>
  )
}
