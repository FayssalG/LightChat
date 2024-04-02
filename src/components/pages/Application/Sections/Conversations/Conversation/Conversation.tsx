import { selectActiveConversation, selectMessageById } from '@/redux/features/Conversation/ConversationSelectors';
import styles from './Conversation.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { closeConversation, setActiveConversation } from '@/redux/features/Conversation/ConversationSlice';
import { selectFriendById } from '@/redux/features/Friend/FriendSlice';

import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { showConversationOnMobile } from '@/redux/features/UiSlice';

export default function Conversation({conversation} : {conversation : Conversation}) {
  const friend : Friend = useSelector((state)=>selectFriendById(state , conversation.friend_id));
  const activeConversation : Conversation | {} = useSelector(selectActiveConversation);
  const isSelected = activeConversation?.conversation_id === conversation.conversation_id 
  
  const dispatch = useDispatch()
  
  const handleSelectConversation = ()=>{
    dispatch(showConversationOnMobile());
    dispatch(setActiveConversation(conversation.conversation_id))
  }

  const handleCloseConversation = ()=>{
    dispatch(closeConversation(conversation.conversation_id));
  }

  // const lastMessageId : number | undefined = conversation.messagesIds[conversation.messagesIds.length-1];
  // const lastMessage  : FriendMessage | {} = useSelector(state=>selectMessageById(state,lastMessageId));

  return (
    <div data-selected={isSelected} className={styles.conversation}>
        <div className={styles.picture}>
            <img src={friend.image} alt="avatar" />
        </div>

        <UnstyledButton className={styles.name_lastmsg} onClick={handleSelectConversation}>
            <h2 className={styles.name}>{friend.display_name}</h2>
            <div className={styles.lastmsg}>
              {/* <p className={styles.text}> {lastMessage?.text || null} </p>
              <p className={styles.time}> {lastMessage?.created_at || null} </p> */}
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
