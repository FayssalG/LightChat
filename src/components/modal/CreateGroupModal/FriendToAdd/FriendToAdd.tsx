import styles from './FriendToAdd.module.css';
import { IoCheckmark } from 'react-icons/io5';
import avatar from '@/assets/avatar.png';

export default function FriendToAdd({friend}) {
  return (
    
        <label htmlFor='member' className={styles.friend}>
            <div className={styles.picture}>
                <img src={friend.image} alt="avatar" />
            </div>
            <p className={styles.name}>{friend.display_name}</p>
            
            <input  type="checkbox" value={friend.user_id} name="member"  />
            <div className={styles.checkmark_container}>
                <IoCheckmark className={styles.checkmark}/>
            </div>
        </label>


  )
}
