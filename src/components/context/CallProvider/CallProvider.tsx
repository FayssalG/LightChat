import 'react-toastify/ReactToastify.css';
import CallNotification from './CallNotification/CallNotification';
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "../SocketProvider"
import Peer from 'simple-peer';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CallContext = createContext(undefined)
export function useCall(){
    return useContext(CallContext)
}

export default function CallProvider({children}) {    
    const user = useSelector(state=>state.auth.user);
    const socket = useSocket()
    
    const [isReceivingAudioCall , setIsReceivingAudioCall] = useState(false)
    const [isReceivingVideoCall , setIsReceivingVideoCall] = useState(false)
    
    const [callStatus , setCallStatus] = useState({audio:'idle' , video:'idle'});

    const [otherPersonUsername , setOtherPersonUsername ] = useState('')
    const [personCallingUsername , setPersonCallingUsername] = useState('')
    const [callerSignal , setCallerSignal] = useState(null)


    const streamRef = useRef<MediaStream | null>(null)
    const localStreamRef = useRef<HTMLInputElement>(null);
    const remoteStreamRef = useRef<HTMLInputElement>(null);
    const peerConnRef =useRef(null) 


    const stopStream = async ()=>{
        streamRef?.current?.getTracks().forEach((track)=>{
            track.stop()
        })
    }


    useEffect(()=>{
        if(socket){
            socket.on('cancel-receiving-call' , ()=>{
                setIsReceivingVideoCall(false)
                setIsReceivingAudioCall(false)
            })

            socket.on('receiving-call' , ({from , signal , callType })=>{
                    console.log('tst')

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
        try{
            setOtherPersonUsername(toUsername)
        
            setCallStatus(prev=>{
                return {...prev, video: 'calling'}
            })
   
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true
            })

            if(localStreamRef.current){
                localStreamRef.current.srcObject = stream
            }        

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
            })
    
            peerConnRef.current = peer
        
        }catch(err){
            setCallStatus(prev=>({...prev,video:'idle'}))
            toast.error(err.message+' !',{
                position:'top-center',
            })
        }

    }


    const answerVideo = async ()=>{
        try{
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true
            })
            streamRef.current = stream

            setOtherPersonUsername(personCallingUsername)

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
                if(remoteStreamRef.current && localStreamRef.current){
                    remoteStreamRef.current.srcObject = mediaStream
                    localStreamRef.current.srcObject = stream
                }
    
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
        peerConnRef.current.destroy();
        // peerConnRef.current = null;
    }

    
    const cancelCall = ()=>{
        socket.emit('cancel' , otherPersonUsername)

        setCallStatus(prev=>{
            return {video:'idle', audio: 'idle'}
        })

        stopStream();
        // peerConnRef.current.destroy()
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


    const shareScreen = async ()=>{
        try{
            if(streamRef.current){
                const tracks = streamRef.current.getTracks()
                tracks.forEach((track)=>{
                    track.stop()
                });
                const newStream =  await navigator.mediaDevices.getDisplayMedia({
                    video : {
                        displaySurface : 'borwser'
                    },
                });

                peerConnRef?.current?.replaceTrack(
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
        shareScreen,
        callStatus,
        isReceivingAudioCall, 
        isReceivingVideoCall, 
        personCallingUsername , 
        otherPersonUsername,
        remoteStreamRef,
        localStreamRef
    }

    return (
        <>
            <CallContext.Provider value={value}>
                {isReceivingAudioCall && <CallNotification personCallingUsername={personCallingUsername} callStatus={callStatus.audio} answer={answerAudio} reject={reject}/>}
                {isReceivingVideoCall && <CallNotification personCallingUsername={personCallingUsername} callStatus={callStatus.video} answer={answerVideo} reject={reject}/>}
            
                {children}
            </CallContext.Provider>

        </>
    )
}
