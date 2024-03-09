import styles from './FriendsSection.module.css';
import Friend from './Friend/Friend';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';

export default function FriendsSection() {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title_addbtn}>
            <h1 >Friends</h1>
            <UnstyledButton>Add Friend</UnstyledButton>
          </div>

          <div className={styles.search}>
            <input type="text" placeholder='Search...'/>
          </div>

          <div className={styles.filters}>
            <button>All</button>
            <button>Blocked</button>
            <button>Pending</button>
          </div>  
        </div>


        <div className={styles.friends_list}>
            <Friend/>
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />

        </div>
    </div>
  )
}
