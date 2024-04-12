import { useSelector } from 'react-redux';
import styles from './Message.module.css';
import { VscEye } from 'react-icons/vsc';
import { selectMessageById } from '@/redux/features/Conversation/ConversationSelectors';
import { CgFileDocument } from 'react-icons/cg';
import Attachment from './Attachment/Attachment';
// import { selectMessageById } from '@/redux/features/FriendConversation/FriendConversationSlice';


export default function Message({messageRef ,   message , friend} : any) {
  const user = useSelector(state=>state.auth.user);
  
  const {text , attachment , isSent , isSeen} = message;

  const type = message?.sender_id == user.id ? 'self' : null;
  let message_style_classname = type == 'self' ? styles.message_self : styles.message_other  
  
  return (
    <div ref={messageRef} data-loading={isSent===false}   className={styles.message+' '+message_style_classname}>
       
        <div className={styles.message_infos}>
          <span className={styles.sender}>{type=='self' ? 'You' : friend.display_name}</span>
          <span className={styles.time}>Today at 4:55</span>
          
          {
            (type=='self' && isSeen) && <div className={styles.seen}><VscEye/></div>
          }
        </div>
        
        <div className={styles.body}>
          {attachment &&
            <div className={styles.attachment}>
              <Attachment attachment={attachment}/>          
            </div>

          }

          <p>
            {text}
          </p>
        </div>
    </div>

  )
}
