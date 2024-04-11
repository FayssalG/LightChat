import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './Footer.module.css';
import Spinner from '@/components/shared/Spinner/Spinner';

export default function Footer({isLoading , onClose}) {
  return (
    <>
        <UnstyledButton  disabled={isLoading} onClick={onClose} className={styles.cancel}>Cancel</UnstyledButton>
        <UnstyledButton type='submit' form='form' disabled={isLoading} className={styles.confirm}>{isLoading ? <Spinner size={25}/> : 'Done'}</UnstyledButton>
    </>
)
}
