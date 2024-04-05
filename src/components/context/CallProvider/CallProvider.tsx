import CallNotification from './CallNotification/CallNotification';

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "../SocketProvider"
import Peer from 'simple-peer';
import useAuth from "../../hooks/useAuth";

const CallContext = createContext()
export function useCall(){
    return useContext(CallContext)
}

export default function CallProvider({children}) {    
    const {user} = useAuth();
    const socket = useSocket()
    
    const [isReceivingAudioCall , setIsReceivingAudioCall] = useState(false)
    const [isReceivingVideoCall , setIsReceivingVideoCall] = useState(false)
    
    // const [status , setStatus] : ['idle'| 'ongoing' | 'ended' | 'calling'  , Function] = useState('idle');
    const [callStatus , setCallStatus] = useState({audio:'idle' , video:'idle'});

    const [otherPersonUsername , setOtherPersonUsername ] = useState('')
    const [personCallingUsername , setPersonCallingUsername] = useState('')
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
        console.log('RE RENDER')
        if(socket){
            socket.on('cancel-receiving-call' , ()=>{
                setIsReceivingVideoCall(false)
                setIsReceivingAudioCall(false)
            })

            socket.on('receiving-call' , ({from , signal , callType })=>{

                // if(callStatus.audio == 'ongoing' || callStatus.video == 'ongoing' ){
                //     socket.emit('busy');
                //     return null
                // }
                // if(callStatus.audio == 'calling' || callStatus.video == 'calling' ){
                //     socket.emit('busy');
                //     return null
                // }

                if(callType == 'audio'){
                    setIsReceivingAudioCall(true)
                    setPersonCallingUsername(from)
                    setCallerSignal(signal)    
           
                    if(callStatus.audio == 'idle' || callStatus.audio == 'ended'){
                    }
                }else{
                    setIsReceivingVideoCall(true)
                    setPersonCallingUsername(from)
                    setCallerSignal(signal)    
           
                    if(callStatus.video == 'idle' || callStatus.video == 'ended'){
                    }
                }
                    
            })            
            return ()=>socket.off('receiving-call');
        }

    },[socket , callStatus])

    useEffect(()=>{
        if(socket){
            socket.on('call-ended' , ()=>{
                setCallStatus(prev=>{
                    return {audio:'ended',video:'ended'}
                })
                stopStream()
                // peerConnRef.current.destroy()
            })    
        }
    },[socket])
    

    const callAudio = async (toUsername : string)=>{

        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:false
        })
        
        streamRef.current = stream

        setCallStatus(prev=>{
            return {...prev,audio:'calling'}
        })

        setOtherPersonUsername(toUsername)
        
        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream : stream
        })

        socket.once('call-accepted' , (signal)=>{
            setCallStatus(prev=>{
                return {...prev, audio: 'ongoing'}
            })
            peer.signal(signal)
        })
        socket.once('call-rejected' , ()=>{
            stopStream()
            setCallStatus(prev=>{
                return {...prev, audio: 'ended'}
            })
        })

        peer.on('signal' , (signal)=>{
            socket.emit('call' , {from:user.username, signal , to:toUsername , callType:'audio'});
        })

        peer.on('stream' , (stream)=>{
            remoteStreamRef.current.srcObject = stream
        })

        peerConnRef.current = peer
        console.log({peer})
    
    }

    const answerAudio = ()=>{
        if(callStatus.audio == 'ongoing') end();


        navigator.mediaDevices.getUserMedia({
            audio:true,
            video:false            
        })

        .then(stream=>{    
            streamRef.current = stream

            setOtherPersonUsername(personCallingUsername)
            setCallStatus(prev=>{
                return {...prev, audio: 'ongoing'}
            })    
            setIsReceivingAudioCall(false)

            const peer = new Peer({
                initiator:false,
                trickle:false,
                stream:stream
            })
    
            peer.on('signal' , (signal)=>{
                socket.emit('answer' , {to:personCallingUsername , signal ,  callType:'audio'})
            })
    
            peer.on('stream' , (stream)=>{
                remoteStreamRef.current.srcObject = stream
            })
    
            peer.signal(callerSignal)
    
            peerConnRef.current = peer
                
        })
        .catch(err=>{
            console.log(err)
        })
    }


    
    const callVideo = async (toUsername : string)=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true
        })
        setOtherPersonUsername(toUsername)
        
        setCallStatus(prev=>{
            return {...prev, video: 'calling'}
        })

        
        localStreamRef.current.srcObject = stream

        streamRef.current = stream

 
        
        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream : stream

        })

        socket.once('call-accepted' , (signal)=>{
            setCallStatus(prev=>{
                return {...prev, video: 'ongoing'}
            })
            peer.signal(signal)
        })

        socket.once('call-rejected' , ()=>{
            stopStream()
           setCallStatus(prev=>{
                return {...prev, video: 'ended'}
            })
        })

        

        peer.on('signal' , (signal)=>{
            socket.emit('call' , {from:user.username, signal , to:toUsername , callType:'video'});
        })

        peer.on('stream' , (mediaStream)=>{
            remoteStreamRef.current.srcObject = mediaStream
            console.log('test')
            console.log({MEDAIA:remoteStreamRef.current.srcObject})

        })

        peerConnRef.current = peer
    }


    const answerVideo = async ()=>{
        try{
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true
            })
            streamRef.current = stream

            setIsReceivingVideoCall(false)
            setCallStatus(prev=>{
                return {...prev, video: 'ongoing'}
            })
            const peer = new Peer({
                initiator:false,
                trickle:false,
                stream:stream
            })
    
            peer.on('signal' , (signal)=>{
                socket.emit('answer' , {to:personCallingUsername , signal , callType:'video'})
            })
    
            peer.on('stream' , (mediaStream)=>{
                remoteStreamRef.current.srcObject = mediaStream
                localStreamRef.current.srcObject = stream
    
            })
    
            peer.signal(callerSignal)
    
            peerConnRef.current =peer
    
        }catch(err){
            console.log(err)
        }
    }

    
    const reject = ()=>{
        setIsReceivingVideoCall(false)
        setIsReceivingAudioCall(false)
        socket.emit('reject' , personCallingUsername);
    }

    function end(){
        setCallStatus(prev=>{
            return {video:'ended', audio: 'ended'}
        })
        stopStream()
        socket.emit('end' , otherPersonUsername);
        streamRef.current = null
        peerConnRef.current.destroy();
        peerConnRef.current = null;

    }

    
    const cancelCall = ()=>{
        peerConnRef.current.destroy()
        socket.emit('cancel' , otherPersonUsername)
        setCallStatus(prev=>{
            return {video:'idle', audio: 'idle'}
        })
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
                peerConnRef.current.replaceTrack(
                    peerConnRef.current.streams[0].getAudioTracks()[0],
                    newStream.getAudioTracks()[0],
                    peerConnRef.current.streams[0]
                )
                    
                
                streamRef.current = newStream 
                localStreamRef.current.srcObject = newStream;
            }
        }catch(err){
            console.log(err)
        }
    }

    const muteMic = ()=>{
        streamRef.current.getAudioTracks().forEach((track)=>track.enabled = !track.enabled)
    }


    const value = {

        callAudio, 
        answerAudio,
        callVideo,
        answerVideo, 
        end, 
        reject,
        cancelCall,
        muteMic,
        swapCamera,
        callStatus,
        isReceivingAudioCall, 
        isReceivingVideoCall, 
        personCallingUsername , 
        otherPersonUsername,
        remoteStreamRef,
        localStreamRef
    }

    return (
        <CallContext.Provider value={value}>
            {isReceivingAudioCall && <CallNotification personCallingUsername={personCallingUsername} callStatus={callStatus.audio} answer={answerAudio} reject={reject}/>}
            {isReceivingVideoCall && <CallNotification personCallingUsername={personCallingUsername} callStatus={callStatus.video} answer={answerVideo} reject={reject}/>}
            
            {children}
        </CallContext.Provider>
    )
}
