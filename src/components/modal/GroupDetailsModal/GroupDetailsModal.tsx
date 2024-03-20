import styles from './GroupDetailsModal.module.css';
import avatar from '@/assets/avatar.png';
import { IoClose } from 'react-icons/io5';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import Member from './Member/Member';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeGroupDetailsModal } from '@/redux/features/UiSlice';
import { BaseModal } from '../BaseModal';

export default function GroupDetailsModal(props) {
    const {isOpen , onClose} = props;

    const dispatch : Function = useDispatch();


    return (
    <BaseModal show={isOpen} onClose={onClose}>
        <div  className={styles.inner_container}>
            <UnstyledButton className={styles.close} onClick={onClose} >
                <IoClose/>
            </UnstyledButton>
      
            <div className={styles.header}>
                <div className={styles.picture}>
                    <img src={avatar} alt="" />
                </div>         
                <div className={styles.groupname}>
                    Efootball
                </div>       
            </div>

            <div className={styles.body}>
                <p>Members</p>
                <div className={styles.members_list}>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>

                </div>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.danger_btn} >Quit the group</UnstyledButton>
            </div>
        </div>
    </BaseModal>


  )
}
