import styles from './Message.module.css';


export default function Message({messageRef , conversationWith , type , message } : any) {
  const {text  , isSent} = message;
  const message_style_classname = type == 'self' ? styles.message_self : styles.message_other  
  
  return (
    <div ref={messageRef} style={{opacity:isSent===false ? 0.5 : 1}} className={styles.message+' '+message_style_classname}>
        <div className={styles.sender_time}>
            <span className={styles.sender}>{type=='self' ? 'You' : conversationWith.display_name}</span>
            <span className={styles.time}>Today at 4:55</span>
        </div>  
        <p>
          {text}
        </p>
    </div>

  )
}
