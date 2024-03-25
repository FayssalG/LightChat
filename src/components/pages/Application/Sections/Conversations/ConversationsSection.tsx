import { useSelector } from 'react-redux';
import Conversation from './Conversation/Conversation';
import styles from './ConversationsSection.module.css';
import { selectOpenConversations } from '@/redux/features/Conversation/ConversationSlice';
// import { selectOpenConversations } from '@/redux/features/FriendConversation/FriendConversationSlice';

export default function ConversationsSection() {
  const openConversations = useSelector(selectOpenConversations);  

  console.log(openConversations)
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
              openConversations.map((conversation)=>{
                return <Conversation conversation={conversation}/>
              })
          }         
        </div>
    </div>
  )
}
