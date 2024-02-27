import styles from './Message.module.css';


export default function Message({type } : any) {
  const message_style_classname = type == 'self' ? styles.message_self : styles.message_other  
  return (
    <div className={styles.message+' '+message_style_classname}>
        <div className={styles.sender_time}>
            <span className={styles.sender}>{type=='self' ? 'You' : 'Jack Martins'}</span>
            <span className={styles.time}>Today at 4:55</span>
        </div>  
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit assumenda dignissimos eligendi iure! 
        </p>
    </div>

  )
}
