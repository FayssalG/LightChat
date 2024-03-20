import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './CreateGroupModal.module.css';
import avatar from '@/assets/avatar.png';
import FriendToAdd from './FriendToAdd/FriendToAdd';
import { useDispatch, useSelector } from 'react-redux';
import { closeCreateGroupModal } from '@/redux/features/UiSlice';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { BaseModal } from '../BaseModal';

export default function CreateGroupModal(props) {
    
    return (
    <BaseModal show={props.isOpen} onClose={props.onClose}>
        <div className={styles.inner_container}>
            <div className={styles.header}>
            </div>

            <div className={styles.body}>
                <div className={styles.group_picture}>
                    <img src={avatar} alt="" />
                </div>

                <div className={styles.group_name}>
                    <input type="text" placeholder='Group name...' />
                </div>

                <div className={styles.group_members}>
                    <h3>Select Members</h3>
        
                    <div className={styles.friends_list}>
                        <FriendToAdd/>
                        <FriendToAdd/>
                        <FriendToAdd/>
                        <FriendToAdd/>

                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.confirm_btn}>Create</UnstyledButton>
                <UnstyledButton onClick={props.onClose} className={styles.cancel_btn}>Cancel</UnstyledButton>
            </div>
        </div>
    </BaseModal>
  )
}
