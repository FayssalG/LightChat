import styles from './Group.module.css';
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import avatar from '../../../../assets/avatar.png';
import { useDispatch } from 'react-redux';
import { toggleConversationVisibility } from '../../../../redux/features/UiSlice';

export default function Group() {
  const  dispatch = useDispatch();
  return (
  <div className={styles.group}>
      <div className={styles.picture}>
          <img src={avatar} alt="avatar" />
      </div>

      <UnstyledButton onClick={()=>dispatch((toggleConversationVisibility()))} className={styles.name_lastmsg}>
          <h2 className={styles.name}>Efootball mobile</h2>
          <div className={styles.lastmsg}>
            <p className={styles.text}>Hello guys</p>
            <p className={styles.time}>4:00 PM</p>
          
          </div>

      </UnstyledButton>

      <div className={styles.notread_marker}> 
        10
      </div>


  </div>
  )
}
