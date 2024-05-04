import styles from './VideoCall.module.css';
import { BiPhoneOff } from 'react-icons/bi';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useRef, useState } from 'react';
import {  FiMic, FiMicOff } from 'react-icons/fi';
import { MdCameraswitch} from 'react-icons/md';
import { useCall } from '@/components/context/CallProvider/CallProvider';
import { useGetFriendsQuery } from '@/redux/features/friend/friendApi';

export default function VideoCall() {
    const {localStreamRef, remoteStreamRef, callStatus , end:endFn, close:closeFn , muteMic, swapCamera, shareScreen ,otherPersonUsername  , cancelCall} = useCall();
    const videoCallStatus = callStatus.video;

    const {caller} = useGetFriendsQuery(undefined , {
        selectFromResult: ({data})=>({
            caller : data.find(f=>f.username==otherPersonUsername)
        })
    })

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

    const handleShareScreen = ()=>{
        shareScreen();
    }

    const handleMute = ()=>{
        setIsMuted(!isMuted)
        muteMic()
    }

    const handleEndCall = ()=>{
        endFn();
    }

    const handleCancelCall = ()=>{
        cancelCall()
    }

        
    return (
    <div className={styles.container}>
        {
            videoCallStatus == 'calling' && <p style={{textAlign:'center'}}>Calling...</p>
        }
        {
            videoCallStatus == 'ongoing' &&
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
                (videoCallStatus === 'ongoing') &&
                <UnstyledButton onClick={handleEndCall} className={styles.endcall_btn}>
                    <BiPhoneOff/> 
                </UnstyledButton>
            }

            {   
                ( videoCallStatus === 'calling') &&
                <UnstyledButton onClick={handleCancelCall} className={styles.endcall_btn}>
                    <BiPhoneOff/> 
                </UnstyledButton>
            }


            {
                videoCallStatus=='ongoing' &&
                <>
                    <UnstyledButton onClick={handleMute} className={styles.btn}>
                        {isMuted ? <FiMicOff/> : <FiMic/>}
                    </UnstyledButton>
                    
                    <UnstyledButton onClick={handleSwapCamera}  className={styles.btn}>
                        <MdCameraswitch/>
                    </UnstyledButton>

                    {/* <UnstyledButton onClick={handleShareScreen}  className={styles.mute_btn}>
                        <MdShare/>
                    </UnstyledButton> */}

                </>
                
            }
            


        </div>
    </div>
  )
}
