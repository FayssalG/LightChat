
import styles from './CallNotification.module.css';
import notification from '@/assets/notification.mp3';

import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { BiPhoneCall, BiPhoneIncoming, BiPhoneOff } from 'react-icons/bi';
import { useEffect } from 'react';
import { useGetFriendsQuery } from '@/redux/features/friend/friendApi';

export default function CallNotification({answer , reject , personCallingUsername , callStatus}) {
    const {caller} = useGetFriendsQuery(undefined , {
        selectFromResult : ({data})=>({
            caller : data.find((f)=>f.username==personCallingUsername)
        })
    })

    useEffect(()=>{
        const audio = new Audio(notification)
        audio.play()
    },[])

  const handleReject = ()=>{
    reject()
  }

  return (
    <div className={styles.container}>

        <div className={styles.inner_container}>
            <div className={styles.title}>
                <span>Incoming call</span>
            </div>
            <div className={styles.friend}>
                <div className={styles.picture}>
                    <img src={caller.image} alt="" />
                </div>
                <div className={styles.name_username}>
                    <p className={styles.name}>{caller.display_name}</p>
                    <p className={styles.username} >{caller.username}</p>
                </div>
            </div>

            <div className={styles.controls}>
                <UnstyledButton onClick={answer}  className={styles.accept_btn}>
                {callStatus=='ongoing' ? 'End an answer' : <BiPhoneCall/> }
                </UnstyledButton>
                <UnstyledButton onClick={handleReject} className={styles.decline_btn}>
                     <BiPhoneOff/> 
                </UnstyledButton>
            </div>
        </div>
    </div>
  )
}
