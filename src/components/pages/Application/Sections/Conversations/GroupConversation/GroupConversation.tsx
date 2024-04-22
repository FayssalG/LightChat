import styles from './GroupConversation.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { setActiveConversation} from '@/redux/features/Conversation/ConversationSlice';

import { useDispatch } from 'react-redux';
import { useGetGroupsQuery } from '@/redux/features/group/groupApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function GroupConversation({groupConversation}) {
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

        <div data-visible={[]?.length != 0} className={styles.notread_marker}> 
            {[]?.length}
        </div>

    </UnstyledButton>

  )
}
