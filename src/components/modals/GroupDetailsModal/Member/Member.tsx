import { useState , useRef } from 'react';
import styles from './Member.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import avatar from '@/assets/avatar.png';
import { IoMdMore } from 'react-icons/io';

export default function Member() {
    const optionsRef : RefObject<HTMLElement> = useRef(null)
    const [showOptionsMenu , setShowOptionsMenu] : [Boolean , Function] = useState(false)

  return (
    <>
            <div className={styles.member}>
              <div className={styles.picture}>
                <img src={avatar} alt="avatar" />
              </div>

              <UnstyledButton className={styles.displayname_username}>
                  <h2 className={styles.displayname}>Jack Martins</h2>
                  <p className={styles.username}>@jackmartins</p>
              </UnstyledButton>

              {/* <div ref={optionsRef} className={styles.options} >
                 <UnstyledButton onClick={()=>setShowOptionsMenu(!showOptionsMenu)} className={styles.options_btn}>
                   <IoMdMore/>
                 </UnstyledButton>
                 <div data-visible={showOptionsMenu ? 'true' : 'false'}  className={styles.options_menu}>
                    <ul>
                      <li className={styles.option}><UnstyledButton> Send a message </UnstyledButton></li>
                      <li className={`${styles.option} ${styles.option_red}`}><UnstyledButton > Remove From Group </UnstyledButton></li>
                    </ul>
                  </div>
              </div> */}


          </div>

    </>
  )
}
