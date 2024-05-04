import styles from './Group.module.css';
import UnstyledButton from '../../../../../shared/UnstyledButton/UnstyledButton';
import avatar from '../../../../../../assets/avatar.png';
import { useDispatch } from 'react-redux';
import { showConversationOnMobile} from '../../../../../../redux/features/UiSlice';
import { useEffect, useRef, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useModal from '@/components/modal/useModal';

export default function Group({group} : {group:Group}) {
  const navigate = useNavigate();
  const {onOpen : onOpenConfirmQuitGroupModal} = useModal('ConfirmQuitGroupModal');

  const handleOpenGroupConversation = ()=>{
    navigate('/group/'+group.group_conversation.id)
  }

  const handleOpenQuitGroupModal = ()=>{
    onOpenConfirmQuitGroupModal({group})
  }

  const optionsRef = useRef<HTMLDivElement | null>(null)

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
  <div className={styles.group}>
      <div className={styles.picture}>
          <img src={group.image.url} alt="avatar" />
      </div>

      <UnstyledButton onClick={handleOpenGroupConversation}  className={styles.name_lastmsg}>
          <h2 className={styles.name}>{group.name}</h2>
      </UnstyledButton>
        
      <div ref={optionsRef} className={styles.options} >
          <UnstyledButton onClick={()=>setShowOptionsMenu(!showOptionsMenu)} className={styles.options_btn}>
            <IoMdMore/>
          </UnstyledButton>
          <div data-visible={showOptionsMenu ? 'true' : 'false'}  className={styles.options_menu}>
            <ul>
              <li className={styles.option+' '+styles.option_red }>
                <UnstyledButton onClick={handleOpenQuitGroupModal} > Quit Group </UnstyledButton>
              </li>
            </ul>
          </div>
      </div>

      {/* <div className={styles.notread_marker}> 
        10
      </div> */}


  </div>
  )
}
