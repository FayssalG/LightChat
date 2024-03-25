import styles from './ActiveConversation.module.css';
import avatar from '../../../../assets/avatar.png';
import Topbar from './Topbar/Topbar';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import { useSelector } from 'react-redux';
import { useCallback} from 'react';
import { selectFriendById  } from '@/redux/features/Friend/FriendSlice';
import { selectActiveConversation } from '@/redux/features/Conversation/ConversationSlice';
export default function ActiveConversation() {
  const conversationVisibility = useSelector((state)=>state.ui.conversationVisibility);
  const activeConversation  = useSelector(selectActiveConversation)
  console.log({activeConversation});

  const friend = useSelector((state)=>selectFriendById(state,activeConversation?.friend_id));
  
  //scroll down when a message is added
  const setRef = useCallback((element)=>{
    if(element) element.scrollIntoView({smooth:true});
  },[]);

  console.log({FRIEND:friend})
    
  if(!activeConversation) return null
  
    return (
    <div data-visible={conversationVisibility ? 'true' : 'false'} className={styles.container}>
        
        <Topbar friend={friend} />
        
        <div className={styles.inner_container}>
            <div className={styles.infos}> 
                <div className={styles.picture}>
                    <img src={avatar} alt="" />
                </div>
                <div className={styles.name_username}>
                    <h3 className={styles.name}>Jack Martins</h3>
                    <p className={styles.username}>@jackmartins</p>
                </div>
                <div className={styles.btns}>
                    <UnstyledButton className={styles.remove}>Remove Friend</UnstyledButton>
                    <UnstyledButton className={styles.block}>Block</UnstyledButton>
                </div>
            </div>
            
            
            <div className={styles.messages}>
                {
                    activeConversation.messagesIds.map((messageId , index)=>{
                        const isLast = activeConversation.messagesIds.length -1 === index;
                        
                        return <Message messageRef={isLast ? setRef : null} 
                                        key={messageId}
                                        messageId = {messageId} 
                                        friend={friend} 
                      
                                    />
                    })
                }        
            </div>
        </div>

        <MessageInput friend={friend}/>

    </div>
  )
}
