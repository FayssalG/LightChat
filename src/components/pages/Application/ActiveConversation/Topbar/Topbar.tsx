import styles from './Topbar.module.css';
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

export default function Topbar({friend}) {
  const dispatch = useDispatch();

  // const {call} = useAudioCall(); 
  // const {call : videoCall} = useVideoCall();
  const {callVideo,callAudio} = useCall(); 

  const {onOpen : onOpenFriendDetailsModal} = useModal('FriendDetailsModal'); 

  const handleOpenFriendDetails = ()=>{
    onOpenFriendDetailsModal({friend:friend})
  }


  const handleMobileClose=()=>{
    dispatch(hideConversationOnMobile())
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
            <UnstyledButton 
              title={friend.online_status!=='online' ? 'user is offline' : null} 
              disabled={friend.online_status!=='online'} 
              onClick={()=>callAudio(friend.username)}
            >
              <BiPhoneCall/>
            </UnstyledButton>          

            <UnstyledButton 
              title={friend.online_status!=='online' ? 'user is offline' : null} 
              disabled={friend.online_status!=='online'} 
              onClick={()=>callVideo(friend.username)}
            >
              <BiVideo/>
            </UnstyledButton>          

        </div>        

        <UnstyledButton onClick={handleMobileClose} className={styles.close}>
          <IoClose/>
        </UnstyledButton>
    </div>

  )
}
