import styles from './Friend.module.css';
import avatar from '@/assets/avatar.png';

import { IoMdMore } from "react-icons/io";
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmRemoveFriendModal } from '@/redux/features/UiSlice';
import ConfirmRemoveFriendModal from '@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal';
import { setSelectedFriend } from '@/redux/features/FriendSlice';


export default function Friend({friend} : {friend:Friend}) {
  const dispatch = useDispatch()
  const optionsRef = useRef<HTMLDivElement | null>(null)
  
  const handleRemoveClick = ()=>{
    setShowOptionsMenu(false)
    //set the selected friend for the operation
    dispatch(setSelectedFriend(friend))
    dispatch(openConfirmRemoveFriendModal())
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

  return (
    <>
         <div className={styles.friend}>
              <div className={styles.picture}>
                <img src={friend.image} alt="avatar" />
              </div>

              <UnstyledButton className={styles.name_status}>
                  <h2 className={styles.name}>{friend.display_name}</h2>
                  <p className={styles.status}>online</p>
              </UnstyledButton>

              <div ref={optionsRef} className={styles.options} >
                 <UnstyledButton onClick={()=>setShowOptionsMenu(!showOptionsMenu)} className={styles.options_btn}>
                   <IoMdMore/>
                 </UnstyledButton>
                 <div data-visible={showOptionsMenu ? 'true' : 'false'}  className={styles.options_menu}>
                    <ul>
                      <li className={styles.option}><UnstyledButton> Send a message </UnstyledButton></li>
                      <li className={styles.option+' '+styles.option_red }><UnstyledButton onClick={handleRemoveClick}> Remove </UnstyledButton></li>
                    </ul>
                  </div>
              </div>
          </div>
  
    </>
  )
}
