import notFoundImg from '@/assets/404.svg';
import styles from './NotFound.module.css';

export default function NotFound(){

    return (
        <div className={styles.container}>
            <img src={notFoundImg} alt="404 error not found" />
        </div>
    )
}