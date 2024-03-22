import { useSelector } from 'react-redux';
import Conversation from './Conversation/Conversation';
import styles from './ConversationsSection.module.css';

export default function ConversationsSection() {
  const conversations : Conversation = useSelector(state => state.conversation.conversations);
  const openConversationsIds : [string?] = useSelector(state=>state.conversation.openConversations);
  
  const openConversations = conversations.filter((conversation)=>{
    return openConversationsIds.includes(conversation.conversation_id)
  })

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1 >Conversations</h1>
            </div>
            <p className={styles.subtext}>Recent conversations</p>
        </div>

        <div className={styles.conversations_list}>
            {
              openConversations.map((conversation : Conversation)=>{
                return <Conversation conversation={conversation}/>
              })
          }         
        </div>
    </div>
  )
}
