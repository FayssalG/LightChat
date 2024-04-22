import { useDispatch, useSelector } from 'react-redux';
import Conversation from './Conversation/Conversation';
import styles from './ConversationsSection.module.css';
import { useGetConversationsQuery, useGetMessagesQuery } from '@/redux/features/Conversation/conversationApi';
import SectionContainer from '../SectionContainer';
import { useGetGroupsQuery } from '@/redux/features/group/groupApi';
import GroupConversation from './GroupConversation/GroupConversation';
import { useEffect } from 'react';
import { hideBadge } from '@/redux/features/UiSlice';

export default function ConversationsSection() {
  const dispatch = useDispatch();
  const openConversationsIds = useSelector(state=>state.conversation.openConversationsIds);  
  const {openConversations} = useGetConversationsQuery(undefined , {
    selectFromResult : ({data})=>({
      openConversations : data?.filter(({conversation_id})=>openConversationsIds.includes(conversation_id)) ?? []
    })
  })

  const {groupConversations} = useGetGroupsQuery(undefined , {
    selectFromResult : ({data})=>({
      groupConversations : data?.map((group)=>group.group_conversation)
    })
  })

  const {unSeenMessages} = useGetMessagesQuery(undefined , {
    selectFromResult : ({data})=>({
      unSeenMessages : [...data]?.filter((msg)=>!msg.isSeen)
    })
  }) 

  useEffect(()=>{
    if(!unSeenMessages?.length){
      dispatch(hideBadge('conversations'))
    }
  },[unSeenMessages])

  return (
    <SectionContainer>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1 >Conversations</h1>
            </div>
            <p className={styles.subtext}>Recent conversations</p>
        </div>
        

        <div className={styles.conversations_container}>
          { 
            (!groupConversations?.length && !openConversations?.length) &&
            <div className={styles.no_conversations}>
              <p>No Conversations to show</p>
            </div>           
          }

          {groupConversations?.length != 0 &&         
          <div className={styles.group_conversations_list}>              
              <p>Groups</p>
              {
                groupConversations.map((groupConversation)=>{
                  return (
                    <GroupConversation groupConversation={groupConversation}/>     
                  )
                })
              }         
          </div>
          }

          {openConversations?.length != 0 &&
          <div className={styles.conversations_list}>
            <p>Direct messages</p>
              
              {
                openConversations.map((conversation)=>{
                  return (
                    <Conversation conversation={conversation}/>
                  )
                })
            }         
          </div>
          }

      </div>
    </SectionContainer>
  )
}
