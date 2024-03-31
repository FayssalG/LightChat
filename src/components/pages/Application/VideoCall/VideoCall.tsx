import avatar from '@/assets/avatar.png';
import styles from './Video.module.css';
import { BiPhoneCall, BiPhoneOff } from 'react-icons/bi';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useEffect, useState } from 'react';
import { useCall } from '@/components/context/CallProvider';
import { IoClose } from 'react-icons/io5';
import { FiMicOff } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectFriendByUsername } from '@/redux/features/Friend/FriendSlice';

export default function VideoCall() {
    const {localStreamRef, remoteStreamRef, status:callStatus , end:endFn, call , close:closeFn ,callerUsername  } = useCall()
    const caller = useSelector(selectFriendByUsername(callerUsername))

    const [isMute , setIsMute] = useState(false)
   
    const handleMute = ()=>{
        setIsMute(!isMute)
    }
    const handleEndCall = ()=>{
        endFn();
    }

    const [timer , setTimer] = useState(0)
    useEffect(()=>{
        if(callStatus == 'ended') setTimer(0) 

        let interval = null
        if(callStatus == 'ongoing'){
            interval = setInterval(()=>{setTimer((prev)=>prev+1)},1000) 
        }
        return ()=>clearInterval(interval)
      },[callStatus])

    const renderTimer = ()=>{
        const minutes = (timer/60 < 9) ? '0'+Math.floor(timer/60) : Math.floor(timer/60) 
        const seconds = (timer%60 < 9) ? '0'+Math.floor(timer%60) : Math.floor(timer%60)
        const time = minutes+':'+seconds
        return  time  
    }

        
    return (
    <div className={styles.container}>
      
        <div className={styles.friend_container}>
            {/* <div data-pulsing={callStatus === 'calling'} className={styles.picture}>
                <img src={avatar} alt="" />
            </div> */}
            <p className={styles.name}>Jack Martins</p>
            <div className={styles.video_container}>
                <video className={styles.video_player} ref={remoteStreamRef} playsInline autoPlay></video>
            </div>
        </div>
        
        <div className={styles.user_container}>
            {/* <div data-pulsing={callStatus === 'calling'} className={styles.picture}>
                <img src={avatar} alt="" />
            </div> */}
            {/* <p className={styles.name}>Jack Martins</p> */}
            <div className={styles.video_container}>
                <video className={styles.video_player} ref={localStreamRef} playsInline autoPlay></video>
            </div>
        </div>

        {/* <div className={styles.timer_container}>
            <p>
                {callStatus == 'ongoing' && renderTimer()}
                {callStatus == 'calling' && 'Calling...'}
                {callStatus == 'ended' && 'Call Ended'}
            </p>
        </div> */}

        <div className={styles.controls_container}>

            {
                callStatus === 'receivingCall' &&
                <UnstyledButton>
                    
                </UnstyledButton>
            }

            {   
                (callStatus === 'ongoing' || callStatus === 'calling') &&
                <UnstyledButton onClick={handleEndCall} className={styles.endcall_btn}>
                    <BiPhoneOff/> 
                </UnstyledButton>
            }

            {
                callStatus=='ongoing' &&
                <UnstyledButton onClick={handleMute} className={styles.mute_btn}>
                    <FiMicOff/>
                </UnstyledButton>
            }
            

            {
                callStatus=='ended' &&
                <>
                    <UnstyledButton onClick={closeFn}  className={styles.close_btn}>
                        <IoClose/>
                    </UnstyledButton>

                    <UnstyledButton onClick={()=>call(callerUsername)} className={styles.recall_btn}>
                        <BiPhoneCall/>
                    </UnstyledButton>                
                </>    
            }

        </div>
    </div>
  )
}
