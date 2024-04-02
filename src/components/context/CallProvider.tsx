import CallNotification from '../pages/Application/CallNotification/CallNotification';

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "./SocketProvider"
import Peer from 'simple-peer';
import useAuth from "../hooks/useAuth";

const CallContext = createContext()
export function useCall(){
    return useContext(CallContext)
}

export default function CallProvider({children}) {    
    const {user} = useAuth();
    const socket = useSocket()
    
    const [stream , setStream] = useState(null); 
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
            socket.on('receiving-call' , ({from , signal })=>{
                setCallerUsername(from)
                setIsReceivingCall(true)
                setCallerSignal(signal)
            })
            
            socket.on('call-ended' , ()=>{
                setStatus('ended')
                stopStream()
                // peerConnRef.current.destroy()
            })
        }
    },[socket])
    
    

    const call = async (toUsername : string)=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:false
        })
        
        streamRef.current = stream

        setStatus('calling')
        setCallerUsername(toUsername)
        console.log({stream})

        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream : stream
        })

        socket.once('call-accepted' , (signal)=>{
            setStatus('ongoing')
            peer.signal(signal)
        })
        socket.once('call-rejected' , (signal)=>{
            setStatus('ended')
        })

        peer.on('signal' , (signal)=>{
            socket.emit('call' , {from:user.username, signal , to:toUsername});
        })

        peer.on('stream' , (stream)=>{
            remoteStreamRef.current.srcObject = stream
        })

        peerConnRef.current = peer
        console.log({peer})
    
    }

    const answer = async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:false
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
            socket.emit('answer' , {to:callerUsername , signal})
        })

        peer.on('stream' , (stream)=>{
            remoteStreamRef.current.srcObject = stream
        })

        peer.signal(callerSignal)

        peerConnRef.current =peer
    }


    
    
    const reject = ()=>{
        setIsReceivingCall(false)
        socket.emit('reject' , callerUsername);
    }

    const end = ()=>{
        setStatus('idle')
        stopStream()
        socket.emit('end' , callerUsername);
        peerConnRef.current.destroy();
    }

    const close = ()=>{
        setStatus('idle')
    }

    return (
        <CallContext.Provider value={{call , answer, end, reject,close,status, isReceivingCall, callerUsername , remoteStreamRef,localStreamRef}}>
            {isReceivingCall && <CallNotification callerUsername={callerUsername} answer={answer} reject={reject}/>}
            {children}
        </CallContext.Provider>
    )
}
