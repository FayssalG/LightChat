import styles from './Topbar.module.css';
import avatar from '../../../../../assets/avatar.png';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { toggleConversationVisibility , openFriendDetailsModal} from '@/redux/features/UiSlice';

export default function Topbar() {
  const dispatch = useDispatch();

  return (
    <div className={styles.topbar}>
        <div className={styles.picture}>
            <img src={avatar} alt="Avatar" />
        </div>
        <UnstyledButton className={styles.name_status} onClick={(e)=>{e.stopPropagation();dispatch(openFriendDetailsModal())}}>
            <h2 className={styles.name} >Jack Martins</h2>
            <p className={styles.status}>online</p>
        </UnstyledButton>

        <UnstyledButton onClick={()=>dispatch(toggleConversationVisibility())} className={styles.close}>
          <IoClose/>
        </UnstyledButton>
    </div>

  )
}
