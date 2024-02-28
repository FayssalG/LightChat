import styles from './Group.module.css';
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import avatar from '../../../../assets/avatar.png';

export default function Group() {
  return (
  <div className={styles.group}>
      <div className={styles.picture}>
          <img src={avatar} alt="avatar" />
      </div>

      <UnstyledButton className={styles.name_lastmsg}>
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
