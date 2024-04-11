import { useSelector } from 'react-redux';
import Conversation from './Conversation/Conversation';
import styles from './ConversationsSection.module.css';
import { useGetConversationsQuery } from '@/redux/features/Conversation/conversationApi';
import SectionContainer from '../SectionContainer';

export default function ConversationsSection() {
  const openConversationsIds = useSelector(state=>state.conversation.openConversationsIds);  
  const {openConversations} = useGetConversationsQuery(undefined , {
    selectFromResult : ({data})=>({
      openConversations : data?.filter(({conversation_id})=>openConversationsIds.includes(conversation_id)) ?? []
    })
  })


  return (
    <SectionContainer>
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
    </SectionContainer>
  )
}
