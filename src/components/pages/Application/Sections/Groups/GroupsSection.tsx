import styles from './GroupsSection.module.css';
import Group from './Group/Group';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';

export default function GroupsSection() {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1 >Groups</h1>
                <UnstyledButton>Create a group</UnstyledButton>
            </div>
            <p className={styles.subtext}>Your groups</p>
        </div>

        <div className={styles.groups_list}>
            <Group/>
        </div>
    </div>
  )
}
