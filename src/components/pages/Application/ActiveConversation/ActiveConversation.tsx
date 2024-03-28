import styles from './ActiveConversation.module.css';
import avatar from '../../../../assets/avatar.png';
import Topbar from './Topbar/Topbar';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect} from 'react';
import { selectFriendById  } from '@/redux/features/Friend/FriendSlice';

import { markMessagesSeen} from '@/redux/features/Conversation/ConversationSlice';
import { selectMessageById, selectMessagesByConversationId } from '@/redux/features/Conversation/ConversationSelectors';

export default function ActiveConversation({activeConversation}) {
  const dispatch = useDispatch();
  const conversationVisibility = useSelector((state)=>state.ui.conversationVisibility);
  const messages = useSelector(selectMessagesByConversationId(activeConversation.conversation_id))
  const lastMsg = messages[messages.length - 1];
  console.log({MESSAGES:messages})
  const friend = useSelector((state)=>selectFriendById(state,activeConversation?.friend_id));
  
  //scroll down when a message is added
  const setRef = useCallback((element)=>{
    if(element) element.scrollIntoView({smooth:true});
  },[]);

  useEffect(()=>{
    if(activeConversation){
        if(lastMsg && lastMsg?.sender_id == friend?.user_id && lastMsg?.isSeen == false ) {
            dispatch(markMessagesSeen(activeConversation.conversation_id));
        }
    }
  },[activeConversation])
  


  const renderMessages = ()=>{    
     return   messages.map((message , index)=>{
                    const isLast = messages.length -1 === index;
                            
                    return <Message  messageRef={isLast ? setRef : null} 
                            key={message.id}
                            message = {message} 
                            friend={friend}  
                        />
                })
  }

  

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
                {/* <div className={styles.btns}>
                    <UnstyledButton className={styles.remove}>Remove Friend</UnstyledButton>
                    <UnstyledButton className={styles.block}>Block</UnstyledButton>
                </div> */}
            </div>
            
            {   friend.isFriend  &&
                
                <div className={styles.messages}>
                    {renderMessages()}
                </div>
            }
    
        </div>
        
        {
            friend.isFriend ?
                <MessageInput friend={friend}/>
            :

            <div className={styles.restrict_message}>
                <p>Conversation restricted, you can't contact <span>{friend.display_name}</span> for now</p>
            </div>

        }

    </div>
  )
}
