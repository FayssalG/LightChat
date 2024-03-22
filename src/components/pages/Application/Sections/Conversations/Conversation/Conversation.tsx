import styles from './Conversation.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { closeConversation, setActiveConversation } from '@/redux/features/ConversationSlice';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

export default function Conversation({conversation} : {conversation : Conversation}) {
  const dispatch = useDispatch()
  const activeConversation = useSelector(state=>state.conversation.activeConversation);
  const isSelected = activeConversation?.conversation_id === conversation.conversation_id 

  const handleSelectConversation = ()=>{
    dispatch(setActiveConversation(conversation))
  }

  const handleCloseConversation = ()=>{
    dispatch(closeConversation(conversation.conversation_id));
  }

  const lastMessage = conversation?.messages[conversation.messages.length-1];
  return (
    <div data-selected={isSelected} className={styles.conversation}>
        <div className={styles.picture}>
            <img src={conversation.conversationWith.image} alt="avatar" />
        </div>

        <UnstyledButton className={styles.name_lastmsg} onClick={handleSelectConversation}>
            <h2 className={styles.name}>{conversation.conversationWith.display_name}</h2>
            <div className={styles.lastmsg}>
              <p className={styles.text}>{lastMessage?.text}</p>
              <p className={styles.time}>{lastMessage?.created_at}</p>
            </div>
        </UnstyledButton>

        <div data-visible={false} className={styles.notread_marker}> 
          10
        </div>

        <UnstyledButton className={styles.close} onClick={handleCloseConversation}>
            <IoClose/>
        </UnstyledButton>
    </div>

  )
}
