import { FcEndCall } from 'react-icons/fc';
import styles from './VoiceCall.module.css';
import avatar from '@/assets/avatar.png';
import { BiPhoneCall, BiPhoneOff } from 'react-icons/bi';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useEffect, useState } from 'react';
import { useAudioCall} from '@/components/context/AudioCallProvider';
import { IoClose } from 'react-icons/io5';
import { FiMic, FiMicOff } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectFriendByUsername } from '@/redux/features/Friend/FriendSlice';
import { useCall } from '@/components/context/CallProvider/CallProvider';

export default function VoiceCall() {
    const {remoteStreamRef , callStatus , end:endFn , otherPersonUsername, muteMic,cancelCall} = useCall()
    const caller = useSelector(selectFriendByUsername(otherPersonUsername))

    const voiceCallStatus = callStatus.audio

    const [isMute , setIsMute] = useState(false)

    const handleMute = ()=>{
        setIsMute(!isMute)
        muteMic()
    }

    const handleEndCall = ()=>{
        endFn();
    }

    const handleCancelCall = ()=>{
        cancelCall()
    }

    const [timer , setTimer] = useState(0)

    useEffect(()=>{
        if(callStatus !== 'ongoing') setTimer(0) 

        let interval = null
        if(voiceCallStatus == 'ongoing'){
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
        <video className={styles.audio_player} ref={remoteStreamRef} playsInline autoPlay></video>
       
        <div className={styles.participant_container}>
            <div data-pulsing={callStatus === 'calling'} className={styles.picture}>
                <img src={caller.image} alt="" />
            </div>
            <p className={styles.name}>{caller.username}</p>
        </div>

        <div className={styles.timer_container}>
            <p>
                {voiceCallStatus == 'ongoing' && renderTimer()}
                {voiceCallStatus == 'calling' && 'Calling...'}
            </p>
        </div>

        <div className={styles.controls_container}>

            
            {   
                (voiceCallStatus === 'ongoing') &&
                <UnstyledButton onClick={handleEndCall} className={styles.endcall_btn}>
                    <BiPhoneOff/> 
                </UnstyledButton>
            }

            {
                voiceCallStatus === 'calling' &&
                <UnstyledButton onClick={handleCancelCall} className={styles.endcall_btn}>
                    <BiPhoneOff/> 
                </UnstyledButton>
                
            }

            {
                voiceCallStatus=='ongoing' &&
                <UnstyledButton onClick={handleMute} className={styles.mute_btn}>
                    {isMute ? <FiMicOff/> : <FiMic/>}
                </UnstyledButton>
            }
            
        </div>
    </div>
  )
}
