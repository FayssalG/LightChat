import { useState , useRef, useEffect } from 'react';
import styles from './Member.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useGetFriendsQuery } from '@/redux/features/friend/friendApi';
import { IoPersonAdd, IoPersonRemove } from 'react-icons/io5';
import { MdGroupRemove } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';

export default function Member({member , isAdmin , onRemove , onAddFriend ,onSendMessage}) {
    const {friend}= useGetFriendsQuery(undefined , {
      selectFromResult : ({data})=>({
        friend : data?.find(f=>f.user_id == member.id)
      })
    })

    
    
    return (
      <>
            <div className={styles.member}>
              <div className={styles.picture}>
                <img src={member?.image?.url} alt="avatar" />
              </div>

              <UnstyledButton className={styles.displayname_username}>
                  <h2 className={styles.displayname}>{member.display_name}</h2>
                  <p className={styles.username}>@{member.username}</p>
              </UnstyledButton>
              <div className={styles.btns}>
                {
                  friend ?
                  <UnstyledButton onClick={()=>onSendMessage(friend.conversation_id)}> 
                    <AiFillMessage/>
                  </UnstyledButton>
                  :
                  <UnstyledButton className={styles.success} onClick={()=>onAddFriend(member.username)}> 
                    <IoPersonAdd/>
                  </UnstyledButton>
            
                }
                {
                  isAdmin && 
                  <UnstyledButton className={styles.danger} onClick={()=>onRemove(member)}>
                    <MdGroupRemove/>
                  </UnstyledButton>
                }
              </div>
              
              {/* <div ref={optionsRef} className={styles.options} >
                 <UnstyledButton onClick={()=>setShowOptionsMenu(!showOptionsMenu)} className={styles.options_btn}>
                   <IoMdMore/>
                 </UnstyledButton> 
            
                 <div data-visible={showOptionsMenu ? 'true' : 'false'}  className={styles.options_menu}>
                    <ul>
                      {
                        isFriend ?
                        <li className={styles.option}><UnstyledButton> Send a message </UnstyledButton></li>
                        :
                        <li className={styles.option}>
                          <UnstyledButton onClick={()=>onAddFriend(member.username)}> Add Friend </UnstyledButton>
                        </li>
                      }
                      {
                        isAdmin && 
                        <li className={`${styles.option} ${styles.option_red}`}>
                          <UnstyledButton onClick={()=>onRemove(member)}> Remove From Group 
                        </UnstyledButton></li>
                      }
                    </ul>
                  </div>
              </div> */}


          </div>

    </>
  )
}
