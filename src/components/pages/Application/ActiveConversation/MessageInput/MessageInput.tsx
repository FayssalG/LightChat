import styles from './MessageInput.module.css';
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, sendMessageWithAttachment } from '@/redux/features/Conversation/ConversationSlice';
import { ChangeEvent, useRef, useState } from 'react';
import AttachmentPreview from './AttachmentPreview/AttachmentPreview';

export default function MessageInput({friend}) {
  const user : User = useSelector(state=>state.auth.user);
  const dispatch = useDispatch();

  const [attachment , setAttachment] : [File | null , Function] = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const handleSendMessage= (e : React.FormEvent)=>{
    e.preventDefault();
    
    if(attachment){
      const newMessage = {
        id: Math.floor(Math.random()*2000), //set a random id for now  
        conversation_id : friend.conversation_id,
        sender_id :  user.id ,
        receiver_id:friend.user_id , 
        text: inputRef?.current?.value || null,
        attachment : attachment,
        isSent:false,
        isSeen:false
      }

      dispatch(sendMessageWithAttachment(newMessage))
    }
    else if(inputRef.current?.value){
      
      const newMessage = {
        id: Math.floor(Math.random()*2000), //set a random id for now  
        conversation_id : friend.conversation_id,
        sender_id :  user.id ,
        receiver_id:friend.user_id , 
        text:inputRef.current.value,
        isSent:false,
        isSeen:false
      }
      dispatch(sendMessage(newMessage))
      inputRef.current.value = '';
    }
    
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
