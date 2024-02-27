import styles from './Topbar.module.css';
import avatar from '../../../assets/avatar.png';

export default function Topbar() {
  return (
    <div className={styles.topbar}>
        <div className={styles.picture}>
            <img src={avatar} alt="Avatar" />
        </div>
        <div className={styles.name_status}>
            <h2 className={styles.name} >Jack Martins</h2>
            <p className={styles.status}>online</p>
        </div>
    </div>

  )
}
