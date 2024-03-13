import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './Login.module.css';
import { CgSpinner } from 'react-icons/cg';

import useAuth from '@/components/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Spinner from '@/components/shared/Spinner/Spinner';

export default function Login() {
    const {isAuth, isAuthenticating , loginUser } = useAuth();
    const emailRef  = useRef(null);
    const passwordRef = useRef(null);
    const [error , setError] : [string , Function]= useState('') 

    async function handleLogin(e : React.FormEvent) {
        e.preventDefault()
        const email : string = emailRef.current.value;
        const password : string = passwordRef.current.value;
        if (email && password)  {
            await loginUser(email , password , setError)
        }else{
            setError("Please fill out all fields")
        }  
    }

    if(isAuth)  return <Navigate replace to={'/'} /> 
    
    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <h1 className={styles.title}>Log in</h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className= {`${styles.input_container} ${styles.email}`} >
                        <p>Email</p>
                        <input ref={emailRef} type="text" placeholder='Email' />
                    </div>
                    <div className= {`${styles.input_container} ${styles.password}`} >
                        <p>Password</p>
                        <input ref={passwordRef} type="text" placeholder='Password' />
                    </div>
                    <p className={styles.forget_password}>
                        {!isAuthenticating && <a href='/login'>Forgot password?</a>}
                    </p>
                    
                    <p className={styles.error}>
                        { error ? error : '' }
                    </p>

                    <UnstyledButton disabled={isAuthenticating} className={styles.submit_btn}>
                        {isAuthenticating ? <Spinner size={25}/> : 'Log In'}
                    </UnstyledButton>
                    
                    <p className={styles.register}>
                        {!isAuthenticating && <span> Need an account? <Link to='/register'>Register</Link> </span>}
                    </p>
                </form>
            </div>
        </div>
  )
}
