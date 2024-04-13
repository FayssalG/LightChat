import { useCallback, useState } from 'react';
import Message from './Message/Message';
import styles from './MessagesListing.module.css'


export default function MessagesListing({messages , interlocutor}) {

    const setRef = useCallback((element)=>{
     if(element) element.scrollIntoView({smooth:true});
    },[]);

    const [messageToEdit  , setMessageToEdit] = useState(0)

    const handleSetMessageToEdit = (messageId)=>{
        setMessageToEdit(messageId)
    }

    console.log({messageToEdit})
    return (

        messages.map((message , index)=>{
                const isLast = messages.length -1 === index;                        
                return <Message 
                            shouldEdit={message.id==messageToEdit} 
                            onEdit={handleSetMessageToEdit}  
                            messageRef={isLast ? setRef : null} 
                            key={message.id}
                            message = {message} 
                            friend={interlocutor}  
                        />
            })
        
  )
}
