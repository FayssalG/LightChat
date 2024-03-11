import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './Register.module.css';

export default function Register() {
  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <h1 className={styles.title}>Create an account</h1>
            <form className={styles.form}>
                <div className= {`${styles.input_container} ${styles.email}`} >
                    <p>Email</p>
                    <input type="text" placeholder='Email' />
                </div>

                <div className= {`${styles.input_container} ${styles.displayname}`} >
                    <p>Display Name</p>
                    <input type="text" placeholder='Display Name' />
                </div>


                <div className= {`${styles.input_container} ${styles.username}`} >
                    <p>Username</p>
                    <input type="text" placeholder='Username' />
                </div>


                <div className= {`${styles.input_container} ${styles.password}`} >
                    <p>Password</p>
                    <input type="text" placeholder='Password' />
                </div>

                <div className= {`${styles.input_container} ${styles.confirm_password}`} >
                    <p>Confirm Password</p>
                    <input type="text" placeholder='Confirm Password' />
                </div>

                <UnstyledButton className={styles.submit_btn}>
                    Create
                </UnstyledButton>
                
                <p className={styles.login}>
                    You already have an account? <a href='/login'>Login</a>
                </p>
            </form>
        </div>
    </div>


  )
}
