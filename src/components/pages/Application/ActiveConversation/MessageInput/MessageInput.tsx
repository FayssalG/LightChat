import styles from './MessageInput.module.css';
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { send_message } from '@/axios/conversation';
import { useDispatch, useSelector } from 'react-redux';
import { addSentMessage} from '@/redux/features/Conversation/ConversationSlice';
import { sendMessage } from '@/redux/features/FriendConversation/FriendConversationSlice';
import { useRef } from 'react';

export default function MessageInput({friend}) {

  const user : User = useSelector(state=>state.auth.user);
  const inputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useDispatch();

  const handleSendMessage= (e : React.FormEvent)=>{
    e.preventDefault();
    if(inputRef.current?.value){
      const newMessage = {
        id: Math.floor(Math.random()*2000), //set a random id for now  
        conversation_id : friend.conversation_id,
        sender_id :  user.id ,
        receiver_id:friend.user_id , 
        text:inputRef.current.value,
        isSent:false,
        isReceived:false
      }
      
      console.log({newMessage})
      dispatch(sendMessage(newMessage))
      inputRef.current.value = '';
    }
    
  }

  return (
    <form onSubmit={handleSendMessage} className={styles.message_input}>
            <UnstyledButton className={styles.attach_btn}>
                <CiCirclePlus/>
            </UnstyledButton>
            <input ref={inputRef} type="text" placeholder='Type a message...' />

            <UnstyledButton className={styles.send_btn}>
                <IoSend/>
            </UnstyledButton>
    </form>
  )
}
