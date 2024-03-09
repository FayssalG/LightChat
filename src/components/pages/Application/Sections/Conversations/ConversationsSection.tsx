import Conversation from './Conversation/Conversation';
import styles from './ConversationsSection.module.css';

export default function ConversationsSection() {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1 >Conversations</h1>
            </div>
            <p className={styles.subtext}>Recent conversations</p>
        </div>

        <div className={styles.conversations_list}>
            <Conversation/>         
        </div>
    </div>
  )
}
