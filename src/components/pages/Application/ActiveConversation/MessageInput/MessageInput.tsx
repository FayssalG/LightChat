import styles from './MessageInput.module.css';
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useRef, useState } from 'react';
import AttachmentPreview from './AttachmentPreview/AttachmentPreview';
import { useSendMessageMutation, useSendMessageWithAttachmentMutation } from '@/redux/features/Conversation/conversationApi';

export default function MessageInput({friendId , conversationId}) {
  const [sendMessage] = useSendMessageMutation();
  const [sendMessageWithAttachment ] = useSendMessageWithAttachmentMutation();
  const user : User = useSelector(state=>state.auth.user);

  const [attachment , setAttachment] : [File | null , Function] = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const handleSendMessage= (e : React.FormEvent)=>{
    e.preventDefault();
    let newMessage = {
      id: Math.floor(Math.random()*2000), //set a random id for now  
      conversation_id : conversationId,
      sender_id :  user.id ,
      receiver_id:friendId , 
      isSent:false,
      isSeen:false,
      text : '',
      attachment : null
    }

    if(attachment){
      newMessage = {...newMessage,
        text:inputRef.current.value,
        attachment : attachment 
      }
      sendMessageWithAttachment(newMessage)
    }
    else if(inputRef.current.value){
      newMessage = {...newMessage,
        text:inputRef.current.value,
      }
      sendMessage(newMessage)
    }
    
    inputRef.current.value = '';
    setAttachment(null)

  }


  const handleChangeAttachment = (e )=>{
    const file : File | undefined = e.target.files[0];
    
    if(file){
      console.log(file.type)
      setAttachment(file);
      e.target.value = null
    }
  }

  return (
            
    <form onSubmit={handleSendMessage} className={styles.container}>
            <div className={styles.attachment_preview}>
              <AttachmentPreview attachment={attachment} setAttachment={setAttachment} />
            </div>

            <div className={styles.controls}>              
              <UnstyledButton className={styles.attach_btn}>
                  <CiCirclePlus/>
                  <input onChange={handleChangeAttachment} type="file" />
              </UnstyledButton>

              <input ref={inputRef} type="text" placeholder='Type a message...' />

              <UnstyledButton className={styles.send_btn}>
                  <IoSend/>
              </UnstyledButton>
            </div>

    </form>
    
  )

}
