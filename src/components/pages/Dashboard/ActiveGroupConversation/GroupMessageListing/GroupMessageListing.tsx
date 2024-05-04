import { useCallback, useState } from 'react';
import GroupMessage from './GroupMessage/GroupMessage';


export default function GroupMessagesListing({groupMessages , group}) {

    const setRef = useCallback((element)=>{
     if(element) element.scrollIntoView({smooth:true});
    },[]);

    const [messageToEdit  , setMessageToEdit] = useState(0)

    const handleSetMessageToEdit = (messageId)=>{
        setMessageToEdit(messageId)
    }

    console.log({messageToEdit})
    return (

        groupMessages.map((message , index)=>{
                const isLast = groupMessages.length -1 === index;                        
                return <GroupMessage 
                            shouldEdit={message.id==messageToEdit} 
                            onEdit={handleSetMessageToEdit}  
                            messageRef={isLast ? setRef : null} 
                            key={message.id}
                            message = {message} 
                            group={group}  
                        />
            })
        
  )
}
