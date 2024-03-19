import Skeleton from 'react-loading-skeleton';
import styles from './FriendSkeleton.module.css';

export default function FriendSkeleton() {
  return (
    
    <div className={styles.container}>
        <div >
            <Skeleton circle width={40} height={40}/>
        </div>

        <div style={{flex:1}}>
            <Skeleton  style={{width:'100%'}}/>
            <Skeleton  style={{width:'80%'}}/>
        </div>

    </div>

  )
}
