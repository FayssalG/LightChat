import CallNotification from '../pages/Application/CallNotification/CallNotification';

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "./SocketProvider"
import Peer from 'simple-peer';
import useAuth from "../hooks/useAuth";

const VideoCallContext = createContext()
export function useVideoCall(){
    return useContext(VideoCallContext)
}

export default function VideoCallProvider({children}) {    
    const {user} = useAuth();
    const socket = useSocket()
    
    const [isReceivingCall , setIsReceivingCall] = useState(false)
    const [status , setStatus] : ['idle'| 'ongoing' | 'ended' | 'calling'  , Function] = useState('idle');
    const [callerUsername , setCallerUsername] = useState('')
    const [callerSignal , setCallerSignal] = useState(null)


    const streamRef = useRef(null)
    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);
    const peerConnRef =useRef(null) 


    const stopStream = async ()=>{
        streamRef.current.getTracks().forEach((track)=>{
            track.stop()
        })
    }

    useEffect(()=>{
        if(socket){
            socket.on('receiving-video-call' , ({from , signal })=>{
                setCallerUsername(from)
                setIsReceivingCall(true)
                setCallerSignal(signal)
            })
            
            socket.on('video-call-ended' , ()=>{
                setStatus('ended')
                stopStream()
                // peerConnRef.current.destroy()
            })
        }
    },[socket])
    
    

    const call = async (toUsername : string)=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })
        
        streamRef.current = stream

        setStatus('calling')
        setCallerUsername(toUsername)
 
        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream : stream
        })

        socket.once('video-call-accepted' , (signal)=>{
            setStatus('ongoing')
            peer.signal(signal)
        })
        socket.once('video-call-rejected' , (signal)=>{
            setStatus('ended')
        })

        peer.on('signal' , (signal)=>{
            socket.emit('video-call' , {from:user.username, signal , to:toUsername});
        })

        peer.on('stream' , (mediaStream)=>{
            remoteStreamRef.current.srcObject = mediaStream
            localStreamRef.current.srcObject = stream
            console.log('test')
            console.log({MEDAIA:remoteStreamRef.current.srcObject})

        })

        peerConnRef.current = peer
    }

    const answer = async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })

        streamRef.current = stream

        setIsReceivingCall(false)
        setStatus('ongoing')
        const peer = new Peer({
            initiator:false,
            trickle:false,
            stream:stream
        })

        peer.on('signal' , (signal)=>{
            socket.emit('answer-video-call' , {to:callerUsername , signal})
        })

        peer.on('stream' , (mediaStream)=>{
            remoteStreamRef.current.srcObject = mediaStream
            localStreamRef.current.srcObject = stream

        })

        peer.signal(callerSignal)

        peerConnRef.current =peer
    }


    
    
    const reject = ()=>{
        setIsReceivingCall(false)
        socket.emit('reject-video-call' , callerUsername);
    }

    const end = ()=>{
        setStatus('idle')
        stopStream()
        socket.emit('end-video-call' , callerUsername);
        peerConnRef.current.destroy();
    }

    const muteMic = ()=>{
        streamRef.current.getAudioTracks().forEach((track)=>track.enabled = !track.enabled)
    }

    const swapCamera = async (facingMode : string)=>{
        try{
            if(streamRef.current){
                const tracks = streamRef.current.getTracks()
                tracks.forEach((track)=>{
                    track.stop()
                })
                const newStream =  await navigator.mediaDevices.getUserMedia({
                    audio:true,
                    video:{
                        facingMode:facingMode
                    }
                })

                peerConnRef.current.replaceTrack(
                    peerConnRef.current.streams[0].getVideoTracks()[0],
                    newStream.getVideoTracks()[0],
                    peerConnRef.current.streams[0]
                )
                    
                
                streamRef.current = newStream 
                localStreamRef.current.srcObject = newStream;
            }
        }catch(err){
            console.log(err)
        }
    }

    const close = ()=>{
        setStatus('idle')
    }

    return (
        <VideoCallContext.Provider value={{call , answer, end, reject,close, muteMic, swapCamera ,status, isReceivingCall, callerUsername , remoteStreamRef,localStreamRef}}>
            {isReceivingCall && <CallNotification callerUsername={callerUsername} answer={answer} reject={reject}/>}
            {children}
        </VideoCallContext.Provider>
    )
}
