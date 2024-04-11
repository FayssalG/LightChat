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
import { setActiveConversation } from '@/redux/features/Conversation/ConversationSlice';

export default function Topbar({person}) {
  const dispatch = useDispatch();
  // const {call} = useAudioCall(); 
  // const {call : videoCall} = useVideoCall();
  const {callVideo,callAudio} = useCall(); 

  const {onOpen : onOpenFriendDetailsModal} = useModal('FriendDetailsModal'); 

  const handleOpenFriendDetails = ()=>{
    onOpenFriendDetailsModal({friend:person})
  }


  const handleClose=()=>{
    dispatch(setActiveConversation(null))
  }

  console.log({person})
  return (
    <div className={styles.topbar}>
        <div className={styles.picture}>
            <img src={person.image} alt="Avatar" />
        </div>
        
        <UnstyledButton className={styles.name_status} onClick={handleOpenFriendDetails}>
            <h2 className={styles.name} >{person?.display_name}</h2>
            <p className={styles.status}>{person?.online_status}</p>
        </UnstyledButton>

        {
          //check if person is a friend
          person.hasOwnProperty('friendship_id') &&
          
          <div className={styles.call}>
            <UnstyledButton 
              title={person?.online_status!=='online' ? 'user is offline' : null} 
              disabled={person?.online_status!=='online'} 
              onClick={()=>callAudio(person.username)}
            >
              <BiPhoneCall/>
            </UnstyledButton>          

            <UnstyledButton 
              title={person?.online_status!=='online' ? 'user is offline' : null} 
              disabled={person?.online_status!=='online'} 
              onClick={()=>callVideo(person?.username)}
            >
              <BiVideo/>
            </UnstyledButton>          

        </div>        

        }
        
        <UnstyledButton onClick={handleClose} className={styles.close}>
          <IoClose/>
        </UnstyledButton>
    </div>

  )
}
