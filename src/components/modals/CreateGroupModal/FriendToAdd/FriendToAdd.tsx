import styles from './FriendToAdd.module.css';
import { IoCheckmark } from 'react-icons/io5';
import avatar from '@/assets/avatar.png';

export default function FriendToAdd() {
  return (
    
        <label htmlFor='member' className={styles.friend}>
            <div className={styles.picture}>
                <img src={avatar} alt="avatar" />
            </div>
            <p className={styles.name}>Jack Martins</p>
            
            <input  type="checkbox" name="member"  />
            <div className={styles.checkmark_container}>
                <IoCheckmark className={styles.checkmark}/>
            </div>
        </label>


  )
}
