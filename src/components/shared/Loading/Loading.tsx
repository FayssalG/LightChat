import styles from './Loading.module.css';
import Spinner from "../Spinner/Spinner";

export default function Loading() {
  return (
    <div className={styles.container}>
        <Spinner size={40}/>
    </div>
  )
}
