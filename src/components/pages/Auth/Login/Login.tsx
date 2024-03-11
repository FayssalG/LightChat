import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <h1 className={styles.title}>Log in</h1>
            <form className={styles.form}>
                <div className= {`${styles.input_container} ${styles.email}`} >
                    <p>Email</p>
                    <input type="text" placeholder='Email' />
                </div>
                <div className= {`${styles.input_container} ${styles.password}`} >
                    <p>Password</p>
                    <input type="text" placeholder='Password' />
                </div>
                <p className={styles.forget_password}>
                    <a href='/login'>Forgot password?</a>
                </p>

                <UnstyledButton className={styles.submit_btn}>
                    Log In
                </UnstyledButton>
                
                <p className={styles.register}>
                    Need an account? <a href='/login'>Register</a>
                </p>
            </form>
        </div>
    </div>
  )
}
