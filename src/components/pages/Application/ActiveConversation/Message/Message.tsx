import { useSelector } from 'react-redux';
import styles from './Message.module.css';
import { selectMessageById } from '@/redux/features/FriendConversation/FriendConversationSlice';


export default function Message({messageRef ,   messageId , friend} : any) {
  const user = useSelector(state=>state.auth.user);
  const message = useSelector((state)=>selectMessageById(state,messageId)) ;

  const {text  , isSent} = message;

  const type = message?.sender_id == user.id ? 'self' : null;
  const message_style_classname = type == 'self' ? styles.message_self : styles.message_other  
  
  return (
    <div ref={messageRef} style={{opacity:isSent===false ? 0.5 : 1}} className={styles.message+' '+message_style_classname}>
        <div className={styles.sender_time}>
            <span className={styles.sender}>{type=='self' ? 'You' : friend.display_name}</span>
            <span className={styles.time}>Today at 4:55</span>
        </div>  
        <p>
          {text}
        </p>
    </div>

  )
}
