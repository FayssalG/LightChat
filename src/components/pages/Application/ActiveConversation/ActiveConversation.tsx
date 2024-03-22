import styles from './ActiveConversation.module.css';
import avatar from '../../../../assets/avatar.png';
import Topbar from './Topbar/Topbar';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';


export default function ActiveConversation() {
  const conversationVisibility = useSelector((state)=>state.ui.conversationVisibility);
  const user : User= useSelector(state=>state.auth.user)
  const activeConversation : Conversation | null = useSelector(state=>state.conversation.activeConversation)
  
  //scroll down when a message is added
  const setRef = useCallback((element)=>{
    if(element) element.scrollIntoView({smooth:true});
  },[]);

    
  if(!activeConversation) return null
  
    return (
    <div data-visible={conversationVisibility ? 'true' : 'false'} className={styles.container}>
        
        <Topbar conversationWith={activeConversation.conversationWith} />
        
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
                    activeConversation.messages.map((message , index)=>{
                        const isLast = activeConversation.messages.length -1 === index;
                        
                        return <Message messageRef={isLast ? setRef : null} 
                                        key={message?.id || index} 
                                        conversationWith={activeConversation.conversationWith} 
                                        text={message?.text} 
                                        type={message?.sender_id == user.id ? 'self' : null}
                                />
                    })
                }        
            </div>
        </div>

        <MessageInput conversationWith={activeConversation.conversationWith}/>

    </div>
  )
}
