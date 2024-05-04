import Skeleton from 'react-loading-skeleton';
import styles from './TopbarLoadingSkeleton.module.css';

export default function TopbarLoadingSkeleton() {
  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <div >
                <Skeleton circle width={40} height={40}/>
            </div>

            <div style={{flex:1}}>
                <Skeleton  style={{width:'100%'}}/>
                <Skeleton  style={{width:'80%'}}/>
            </div>
        </div>

    </div>
  )
}
