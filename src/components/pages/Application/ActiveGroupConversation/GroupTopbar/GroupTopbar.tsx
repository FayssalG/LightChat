import styles from './GroupTopbar.module.css';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { IoCall, IoClose } from 'react-icons/io5';
import { useDispatch} from 'react-redux';
import { hideConversationOnMobile} from '@/redux/features/UiSlice';
import useModal from '@/components/modal/useModal';
import { useAudioCall } from '@/components/context/AudioCallProvider';
import { BiCamera, BiPhoneCall, BiVideo } from 'react-icons/bi';
import { useVideoCall } from '@/components/context/VideoCallProvider';
import { useEffect } from 'react';
import { useCall } from '@/components/context/CallProvider/CallProvider';
import { setActiveConversation } from '@/redux/features/Conversation/ConversationSlice';
import { useNavigate } from 'react-router-dom';

export default function GroupTopbar({onOpenDetails,group}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const handleClose=()=>{
    dispatch(setActiveConversation(null))
    navigate('/')
  }

  
  return (
    <div className={styles.topbar}>
        <div className={styles.picture}>
            <img src={group.image.url} alt="Avatar" />
        </div>
        
        <UnstyledButton onClick={onOpenDetails} className={styles.name_status}>
            <h2 className={styles.name} >{group?.name}</h2>
        </UnstyledButton>

        
        <UnstyledButton onClick={handleClose} className={styles.close}>
          <IoClose/>
        </UnstyledButton>
    </div>

  )
}
