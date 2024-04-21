import styles from './GroupConversation.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { closeConversation, openConversation, setActiveConversation} from '@/redux/features/Conversation/ConversationSlice';

import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { showConversationOnMobile } from '@/redux/features/UiSlice';
import { useGetMessagesQuery } from '@/redux/features/Conversation/conversationApi';
import { useGetGroupsQuery } from '@/redux/features/group/groupApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { match } from 'assert';

export default function GroupConversation({groupConversation} : {conversation : Conversation}) {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {convId} = useParams() 
  
  // const activeConversationId : string | null = useSelector(state=>state.conversation.activeConversationId);
  const isSelected = (pathname?.match(/\/group\/*/g) && convId == groupConversation.id) 
  // const {unSeenMessages} = useGetMessagesQuery(undefined , {
  //   selectFromResult : ({data})=>({
  //     unSeenMessages : [...data]?.filter((msg)=>!msg.isSeen && msg.sender_id==conversation.interlocutor.user_id)
  //   })
  // }) 

  const dispatch = useDispatch();
  const {group} = useGetGroupsQuery(undefined , {
    selectFromResult : ({data})=>({
      group : data?.find(g=>g.id === groupConversation.group_id)
    })
  })

  const handleSelectConversation = ()=>{
    dispatch(setActiveConversation({id:groupConversation.id ,  type:'group'}))
    // dispatch(openConversation(groupConversation.id))
    navigate('/group/'+groupConversation.id);
  }

  // const handleCloseConversation = ()=>{
  //   dispatch(closeConversation(conversation.conversation_id));
  // }

  // const lastMessageId : number | undefined = conversation.messagesIds[conversation.messagesIds.length-1];
  // const lastMessage  : FriendMessage | {} = useSelector(state=>selectMessageById(state,lastMessageId));

  return (
    <UnstyledButton  onClick={handleSelectConversation} data-selected={isSelected} className={styles.conversation}>
        <div className={styles.picture}>
            <img src={group.image.url} alt="avatar" />
        </div>

        <div className={styles.name}>
            <h2 className={styles.display_name}>{group.name}</h2>
            {/* <div className={styles.lastmsg}>
              <p className={styles.text}> {lastMessage?.text || null} </p>
              <p className={styles.time}> {lastMessage?.created_at || null} </p>
            </div> */}
            {/* <p className={styles.username}>
              @{conversation.interlocutor.username}
            </p> */}

        </div>

        <div data-visible={[1]?.length != 0} className={styles.notread_marker}> 
            {[1]?.length}
        </div>

    </UnstyledButton>

  )
}
