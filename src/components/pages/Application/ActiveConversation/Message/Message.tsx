import styles from './Message.module.css';


export default function Message({messageRef , conversationWith , type , text } : any) {
  const message_style_classname = type == 'self' ? styles.message_self : styles.message_other  
  
  return (
    <div ref={messageRef} className={styles.message+' '+message_style_classname}>
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
