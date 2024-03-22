import styles from './MessageInput.module.css';
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { send_message } from '@/axios/conversation';
import { useDispatch } from 'react-redux';
import { addSentMessage } from '@/redux/features/ConversationSlice';
import { useRef } from 'react';

export default function MessageInput({conversationWith}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useDispatch();

  const handleSendMessage= (e : React.FormEvent)=>{
    e.preventDefault();
    if(inputRef.current?.value){
      send_message(conversationWith.user_id , inputRef.current.value)
      .then((res)=>{
        if(res.status == 200){
          dispatch(addSentMessage(res.data))
        }
      })
      .catch((err)=>{
        console.log(err)
      })
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
