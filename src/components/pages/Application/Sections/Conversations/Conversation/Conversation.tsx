import { selectActiveConversation, selectMessageById } from '@/redux/features/Conversation/ConversationSelectors';
import styles from './Conversation.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { closeConversation, openConversation, setActiveConversation} from '@/redux/features/Conversation/ConversationSlice';

import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { showConversationOnMobile } from '@/redux/features/UiSlice';
import { useGetMessagesQuery } from '@/redux/features/Conversation/conversationApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Conversation({conversation} : {conversation : Conversation}) {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {convId} = useParams() 
  // const activeConversationId : string | null = useSelector(state=>state.conversation.activeConversationId);
  const isSelected = (pathname?.match(/\/friend\/*/g) && convId == conversation.conversation_id) 
  const {unSeenMessages} = useGetMessagesQuery(undefined , {
    selectFromResult : ({data})=>({
      unSeenMessages : [...data]?.filter((msg)=>!msg.isSeen && msg.sender_id==conversation.person.user_id)
    })
  }) 

  const dispatch = useDispatch()
  
  const handleSelectConversation = ()=>{
    dispatch(showConversationOnMobile());
    // dispatch(setActiveConversation({id:conversation.conversation_id , type:'friend'}))
    navigate('/friend/'+conversation.conversation_id)
    dispatch(openConversation(conversation.conversation_id))

  }

  const handleCloseConversation = ()=>{
    dispatch(closeConversation(conversation.conversation_id));
  }

  // const lastMessageId : number | undefined = conversation.messagesIds[conversation.messagesIds.length-1];
  // const lastMessage  : FriendMessage | {} = useSelector(state=>selectMessageById(state,lastMessageId));

  return (
    <UnstyledButton  onClick={handleSelectConversation} data-selected={isSelected} className={styles.conversation}>
        <div className={styles.picture}>
            <img src={conversation.person.image} alt="avatar" />
        </div>

        <div className={styles.name}>
            <h2 className={styles.display_name}>{conversation.person.display_name}</h2>
            {/* <div className={styles.lastmsg}>
              <p className={styles.text}> {lastMessage?.text || null} </p>
              <p className={styles.time}> {lastMessage?.created_at || null} </p>
            </div> */}
            <p className={styles.username}>
              @{conversation.person.username}
            </p>

        </div>

        <div data-visible={unSeenMessages?.length != 0} className={styles.notread_marker}> 
            {unSeenMessages?.length}
        </div>

        <UnstyledButton className={styles.close} onClick={handleCloseConversation}>
            <IoClose/>
        </UnstyledButton>
    </UnstyledButton>

  )
}
