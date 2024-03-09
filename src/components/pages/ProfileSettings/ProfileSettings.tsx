import avatar from '../../../assets/avatar.png';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ProfileSettings.module.css';
import { IoArrowBack } from 'react-icons/io5';
import EditModal from './EditModal/EditModal';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowEditModal } from '@/redux/features/UiSlice';
import { Link } from 'react-router-dom';

export default function ProfileSettings() { 
  const showEditModal = useSelector(state=>state.ui.showEditModal);
  const dispatch = useDispatch()
    
  return (
    <div className={styles.container}>
        <Link to='/' className={styles.back}>
            <IoArrowBack/>
        </Link>
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <div className={styles.picture}>
                    <img src={avatar} alt="" />
                </div>         
                <div className={styles.displayname_username}>
                    <h2 className={styles.displayname}>
                        GyroZ
                    </h2>
                    <p className={styles.username}>
                        @gyroz01
                    </p>
                </div>       
            </div>
            
            <div className={styles.settings_container}>
                <div className={styles.setting}>
                    <div>
                        <h2>Display name</h2>
                        <p>GyroZ</p>
                    </div>
                    <UnstyledButton onClick={()=>dispatch(toggleShowEditModal())}>Edit</UnstyledButton>
                
                </div>

                <div className={styles.setting}>
                    <div>
                        <h2>username</h2>
                        <p>gyroz01</p>
                    </div>
                    <UnstyledButton>Edit</UnstyledButton>
                </div>


                <div className={styles.setting}>
                    <div>
                        <h2>Email</h2>
                        <p>pizza******@gmail.com</p>
                    </div>
                    <UnstyledButton>Edit</UnstyledButton>
                </div>

            </div>
        </div>
        
        {showEditModal ? <EditModal/> : null }
    </div>
    
  )
}
