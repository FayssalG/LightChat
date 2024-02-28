import styles from './ActiveConversation.module.css';
import avatar from '../../assets/avatar.png';
import Topbar from './Topbar/Topbar';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import UnstyledButton from '../shared/UnstyledButton/UnstyledButton';

export default function ActiveConversation() {
  return (
    <div className={styles.container}>
        
        <Topbar/>
        
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
                <Message type='self' />
                <Message />
                <Message type='self' />
                <Message />
        
            </div>
        </div>

        <MessageInput/>
    </div>
  )
}
