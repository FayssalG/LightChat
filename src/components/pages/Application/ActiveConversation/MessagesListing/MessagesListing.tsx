import { useCallback } from 'react';
import Message from './Message/Message';
import styles from './MessagesListing.module.css'


export default function MessagesListing({messages , interlocutor}) {

    const setRef = useCallback((element)=>{
     if(element) element.scrollIntoView({smooth:true});
    },[]);



    return (

        messages.map((message , index)=>{
                const isLast = messages.length -1 === index;                        
                return <Message  messageRef={isLast ? setRef : null} 
                            key={message.id}
                            message = {message} 
                            friend={interlocutor}  
                        />
            })
        
  )
}
