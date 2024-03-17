import styles from './Blocked.module.css';

import { IoMdMore } from "react-icons/io";
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmRemoveFriendModal } from '@/redux/features/UiSlice';


export default function Blocked({blocked} : {friend:Friend}) {
  const dispatch = useDispatch()
  const optionsRef : RefObject<HTMLElement> = useRef(null)
  
  useEffect(()=>{
    const hideOptionsMenu = (e : MouseEvent)=>{
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
                <img src={blocked.image} alt="avatar" />
              </div>

              <UnstyledButton className={styles.name_status}>
                  <h2 className={styles.name}>{blocked.display_name}</h2>
                  <p className={styles.status}>online</p>
              </UnstyledButton>

              <div ref={optionsRef} className={styles.options} >
                 <UnstyledButton onClick={()=>setShowOptionsMenu(!showOptionsMenu)} className={styles.options_btn}>
                   <IoMdMore/>
                 </UnstyledButton>
                 <div data-visible={showOptionsMenu ? 'true' : 'false'}  className={styles.options_menu}>
                    <ul>
                      <li className={styles.option}><UnstyledButton> Send a message </UnstyledButton></li>
                      <li className={styles.option+' '+styles.option_red }><UnstyledButton onClick={()=>dispatch(openConfirmRemoveFriendModal())}> Remove </UnstyledButton></li>
                    </ul>
                  </div>
              </div>


          </div>

    </>
  )
}
