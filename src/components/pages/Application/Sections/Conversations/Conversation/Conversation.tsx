import styles from './Conversation.module.css';
import avatar from '../../../../assets/avatar.png';
import UnstyledButton from '../../../../../shared/UnstyledButton/UnstyledButton';
import { IoClose } from 'react-icons/io5';

export default function Conversation() {
  return (
    <div className={styles.conversation}>
        <div className={styles.picture}>
            <img src={avatar} alt="avatar" />
        </div>

        <UnstyledButton className={styles.name_lastmsg}>
            <h2 className={styles.name}>Jack Martins</h2>
            <div className={styles.lastmsg}>
              <p className={styles.text}>wsup dog</p>
              <p className={styles.time}>5:00 PM</p>
            </div>
        </UnstyledButton>

        <div className={styles.notread_marker}> 
          10
        </div>

        <UnstyledButton className={styles.close}>
            <IoClose/>
        </UnstyledButton>
    </div>

  )
}
