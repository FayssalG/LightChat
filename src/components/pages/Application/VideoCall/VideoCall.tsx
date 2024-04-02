import avatar from '@/assets/avatar.png';
import styles from './VideoCall.module.css';
import { BiPhoneCall, BiPhoneOff } from 'react-icons/bi';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiCamera, FiMic, FiMicOff } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectFriendByUsername } from '@/redux/features/Friend/FriendSlice';
import { useVideoCall } from '@/components/context/VideoCallProvider';
import { MdCameraswitch } from 'react-icons/md';

export default function VideoCall() {
    const {localStreamRef, remoteStreamRef, status:callStatus , end:endFn, close:closeFn , muteMic, swapCamera ,callerUsername  } = useVideoCall()
    const caller = useSelector(selectFriendByUsername(callerUsername))

    const [cameraFacing , setCameraFacing]= useState('user')
    const [isMuted , setIsMuted] = useState(false)
    
    const userScreenRef = useRef(null);
    const participantScreenRef = useRef(null)

    const handleSwapScreen = ()=>{
        const remoteStream = remoteStreamRef.current.srcObject
        const localStream = localStreamRef.current.srcObject
        localStreamRef.current.srcObject = remoteStream;
        remoteStreamRef.current.srcObject = localStream
    }

    const handleSwapCamera = ()=>{
        if(cameraFacing=='user'){
            setCameraFacing('environment')
            swapCamera('environment')
        } 
        else{
            setCameraFacing('user')
            swapCamera('user')
        } 
    }

    const handleMute = ()=>{
        setIsMuted(!isMuted)
        muteMic()
    }

    const handleEndCall = ()=>{
        endFn();
    }

        
    return (
    <div className={styles.container}>

        {
            callStatus == 'ended' ? 
            <p className={styles.call_ended_msg}>Call Ended</p>
            :
        <div ref={participantScreenRef} className={styles.participants_container}>
            <div className={styles.participant}>
                <p className={styles.name}>{caller.display_name}</p>
                <div className={styles.video_container}>
                    <video   ref={remoteStreamRef} className={styles.video_player} playsInline autoPlay></video>
                </div>
            </div>    
          </div>

        }

        
        <div ref={userScreenRef} onClick={handleSwapScreen} className={styles.user_container}>
            <div className={styles.video_container}>
                <video ref={localStreamRef} className={styles.video_player} muted  playsInline autoPlay></video>
            </div>
        </div>


        <div className={styles.controls_container}>


            {   
                (callStatus === 'ongoing' || callStatus === 'calling') &&
                <UnstyledButton onClick={handleEndCall} className={styles.endcall_btn}>
                    <BiPhoneOff/> 
                </UnstyledButton>
            }

            {
                callStatus=='ongoing' &&
                <>
                    <UnstyledButton onClick={handleMute} className={styles.mute_btn}>
                        {isMuted ? <FiMicOff/> : <FiMic/>}
                    </UnstyledButton>
                    
                    <UnstyledButton onClick={handleSwapCamera}  className={styles.mute_btn}>
                        <MdCameraswitch/>
                    </UnstyledButton>
                    
                </>
                
            }
            

            {
                callStatus=='ended' &&
                <>
                    <UnstyledButton onClick={closeFn}  className={styles.close_btn}>
                        <IoClose/>
                    </UnstyledButton>
                </>    
            }

        </div>
    </div>
  )
}
