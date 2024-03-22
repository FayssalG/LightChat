import styles from './Topbar.module.css';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { toggleConversationVisibility , openFriendDetailsModal} from '@/redux/features/UiSlice';
import useModal from '@/components/modal/useModal';

export default function Topbar({conversationWith}) {
  const dispatch = useDispatch();

  const {onOpen : onOpenFriendDetailsModal} = useModal('FriendDetailsModal'); 

  const handleOpenFriendDetails = ()=>{
    onOpenFriendDetailsModal({friend:conversationWith})
  }

  return (
    <div className={styles.topbar}>
        <div className={styles.picture}>
            <img src={conversationWith.image} alt="Avatar" />
        </div>
        <UnstyledButton className={styles.name_status} onClick={handleOpenFriendDetails}>
            <h2 className={styles.name} >{conversationWith.display_name}</h2>
            <p className={styles.status}>online</p>
        </UnstyledButton>

        <UnstyledButton onClick={()=>dispatch(toggleConversationVisibility())} className={styles.close}>
          <IoClose/>
        </UnstyledButton>
    </div>

  )
}
