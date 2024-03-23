import styles from './Friend.module.css';
import avatar from '@/assets/avatar.png';

import { IoMdMore } from "react-icons/io";
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmRemoveFriendModal, openFriendDetailsModal } from '@/redux/features/UiSlice';
import ConfirmRemoveFriendModal from '@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal';
import useModal from '@/components/modal/useModal';
import { addConversation, openConversation, setActiveConversation } from '@/redux/features/ConversationSlice';
import FriendSkeleton from '../../FriendSkeleton/FriendSkeleton';


export default function Friend({friend} : {friend:Friend}) {
  const blockStatus = useSelector(state=>state.block.status);
  const friendStatus = useSelector(state=>state.friend.status);
  const isLoading = (blockStatus=='loading' || friendStatus=='loading')

  const dispatch = useDispatch()
  const optionsRef = useRef<HTMLDivElement | null>(null)

  const {onOpen : onOpenConfirmRemoveFriendModal} = useModal('ConfirmRemoveFriendModal');
  const {onOpen : onOpenFriendDetailsModal} = useModal('FriendDetailsModal');

  const handleRemoveClick = ()=>{
    setShowOptionsMenu(false)
    onOpenConfirmRemoveFriendModal({friend});
  }

  const handleSendMessageClick= ()=>{
    dispatch(openConversation(friend));
  } 

  const handleFriendClick = ()=>{
    onOpenFriendDetailsModal({friend})
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

  if(isLoading) return <FriendSkeleton/>
  
  return (
    <>
         <div className={styles.friend}>
              <div className={styles.picture}>
                <img src={friend.image} alt="avatar" />
              </div>

              <UnstyledButton onClick={handleFriendClick} className={styles.name_status}>
                  <h2 className={styles.name}>{friend.display_name}</h2>
                  <p className={styles.status}>online</p>
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
