import styles from './Topbar.module.css';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { IoCall, IoClose } from 'react-icons/io5';
import { useDispatch} from 'react-redux';
import { toggleConversationVisibility } from '@/redux/features/UiSlice';
import useModal from '@/components/modal/useModal';
import { useCall } from '@/components/context/CallProvider';

export default function Topbar({friend}) {
  const dispatch = useDispatch();

  const {call} = useCall(); 
  const {onOpen : onOpenFriendDetailsModal} = useModal('FriendDetailsModal'); 

  const handleOpenFriendDetails = ()=>{
    onOpenFriendDetailsModal({friend:friend})
  }

  return (
    <div className={styles.topbar}>
        <div className={styles.picture}>
            <img src={friend.image} alt="Avatar" />
        </div>
        
        <UnstyledButton className={styles.name_status} onClick={handleOpenFriendDetails}>
            <h2 className={styles.name} >{friend.display_name}</h2>
            <p className={styles.status}>{friend.online_status}</p>
        </UnstyledButton>

        <div className={styles.call}>
            <UnstyledButton onClick={()=>call(friend.username)}>
              <IoCall/>
            </UnstyledButton>          
        </div>        

        <UnstyledButton onClick={()=>dispatch(toggleConversationVisibility())} className={styles.close}>
          <IoClose/>
        </UnstyledButton>
    </div>

  )
}
