import styles from './Friend.module.css';

import { IoMdMore } from "react-icons/io";
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '@/components/modal/useModal';
import { openConversation, setActiveConversation } from '@/redux/features/Conversation/ConversationSlice';

import FriendSkeleton from '../../FriendSkeleton/FriendSkeleton';
import { showConversationOnMobile} from '@/redux/features/UiSlice';
import { useUnFriendMutation } from '@/redux/features/friend/friendApi';
import { useNavigate } from 'react-router-dom';


export default function Friend({friend}) {
  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  const optionsRef = useRef<HTMLDivElement | null>(null)

  const {onOpen : onOpenConfirmRemoveFriendModal} = useModal('ConfirmRemoveFriendModal');
  const {onOpen : onOpenFriendDetailsModal} = useModal('FriendDetailsModal');


  const handleRemoveClick = ()=>{
    setShowOptionsMenu(false)
    onOpenConfirmRemoveFriendModal({friend});
  }

  const handleSendMessageClick= ()=>{
    setShowOptionsMenu(false)
    dispatch(showConversationOnMobile())
    dispatch(openConversation(friend.conversation_id));
    dispatch(setActiveConversation(friend.conversation_id));
    navigate('/conversations')
  } 

  const handleFriendClick = ()=>{
    // onOpenFriendDetailsModal({friend})
    handleSendMessageClick()
  }

  
  useEffect(()=>{
    const hideOptionsMenu = (e)=>{
      if(optionsRef.current && !optionsRef.current.contains(e.target)){
        setShowOptionsMenu(false)
      }
    }
    document.addEventListener('click', hideOptionsMenu )
    return ()=>document.removeEventListener('click' , hideOptionsMenu)
  },[])

  const [showOptionsMenu , setShowOptionsMenu] : [Boolean , Function] = useState(false)

  // if(isLoading) return <FriendSkeleton/>
  
  return (
    <>
         <div className={styles.friend}>
              <div data-online={friend.online_status=='online'} className={styles.picture}>
                <img src={friend.image} alt="avatar" />
              </div>

              <UnstyledButton onClick={handleFriendClick} className={styles.name_status}>
                  <h2 className={styles.name}>{friend.display_name}</h2>
                  <p className={styles.status}>{friend.online_status}</p>
              </UnstyledButton>

              <div ref={optionsRef} className={styles.options} >
                 <UnstyledButton onClick={()=>setShowOptionsMenu(!showOptionsMenu)} className={styles.options_btn}>
                   <IoMdMore/>
                 </UnstyledButton>
                 <div data-visible={showOptionsMenu ? 'true' : 'false'}  className={styles.options_menu}>
                    <ul>
                      <li className={styles.option}><UnstyledButton onClick={handleSendMessageClick}> Send a message </UnstyledButton></li>
                      <li className={styles.option+' '+styles.option_red }><UnstyledButton onClick={handleRemoveClick}> Remove </UnstyledButton></li>
                    </ul>
                  </div>
              </div>
          </div>
  
    </>
  )
}
