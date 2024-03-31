
import styles from './CallNotification.module.css';
import avatar from '@/assets/avatar.png';
import notification from '@/assets/notification.mp3';

import { IoIosCall } from 'react-icons/io';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { BiPhoneCall, BiPhoneIncoming, BiPhoneOff } from 'react-icons/bi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFriendByUsername } from '@/redux/features/Friend/FriendSlice';

export default function CallNotification({answer , reject , callerUsername}) {
    console.log({callerUsername})
    const caller = useSelector(selectFriendByUsername(callerUsername));

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
                    <BiPhoneCall/>
                </UnstyledButton>
                <UnstyledButton onClick={handleReject} className={styles.decline_btn}>
                    <BiPhoneOff/>
                </UnstyledButton>
            </div>
        </div>
    </div>
  )
}
