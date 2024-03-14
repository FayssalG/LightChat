import UnstyledButton from '../UnstyledButton/UnstyledButton';
import styles  from './EmailNotVerified.module.css';

export default function EmailNotVerified() {
  return (
    <div className={styles.container}>
        <p className={styles.message}>Please check your email to verify you account.</p>
        <UnstyledButton className={styles.resend}>Resend</UnstyledButton>
    </div>
  )
}
