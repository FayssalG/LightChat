import { createContext, useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";


const SocketContext = createContext(null);

export function useSocket(){
    return useContext(SocketContext);
}


export default function SocketProvider({children}) {
  const [socket , setSocket] : [Socket | null , Function] = useState(null);
  const user : User = useSelector(state=>state.auth.user);

  useEffect(()=>{
    const newSocket = io('http://localhost:5000',{
      query : {
        username : user.username
      }
    })
    setSocket(newSocket)
    
    return ()=>newSocket.close()
  },[])


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
