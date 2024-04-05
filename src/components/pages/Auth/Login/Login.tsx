import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './Login.module.css';
import { CgSpinner } from 'react-icons/cg';

import useAuth from '@/components/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Spinner from '@/components/shared/Spinner/Spinner';
import { IoCheckmark } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, passwordForgot } from '@/redux/features/Auth/AuthSlice';

export default function Login() {
    const dispatch = useDispatch()
    const loginStatus = useSelector(state=>state.auth.loginStatus)
    const passwordForgotStatus = useSelector(state=>state.auth.passwordForgotStatus)
    const isLoading = loginStatus == 'loading' || passwordForgotStatus=='loading'
    const loginError = useSelector(state=>state.auth.loginError)
    const passwordForgotError = useSelector(state=>state.auth.passwordForgotError)
    
    



    const {isAuth  , forgotPassword } = useAuth();
    const emailRef  = useRef(null);
    const passwordRef = useRef(null);


    function handleLogin(e : React.FormEvent) {
        e.preventDefault()
        const email : string = emailRef.current.value;
        const password : string = passwordRef.current.value;

        dispatch(loginUser({email,password}))
        
    }

    function handleForgot(e : React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const email : string = emailRef.current.value;
      
        dispatch(passwordForgot({email})) 
    }
    
    if(isAuth)  return <Navigate replace to={'/'} /> 

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <h1 className={styles.title}>Log in</h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className= {`${styles.input_container} ${styles.email}`} >
                        <p className={styles.label}>Email</p>
                        <input ref={emailRef} type="text" placeholder='Email' />
                    </div>
                    <div className= {`${styles.input_container} ${styles.password}`} >
                        <p className={styles.label}>Password</p>
                        <input ref={passwordRef} type="password" placeholder='Password' />
                    </div>
                    <p className={styles.forgot_password}>
                        {!isLoading && <a onClick={handleForgot}>Forgot password?</a>}
                    </p>

                    
                    {/* <label htmlFor='remember_me' className={styles.remember_me}>
                        <p className={styles.label}>Remember me</p>
                        <input  type="checkbox" name="remember_me"  />
                        <div className={styles.checkmark_container}>
                            <IoCheckmark className={styles.checkmark}/>
                        </div>
                    </label> */}

                    <p className={styles.error}>
                        { loginError ? loginError : '' }
                    </p>
                    <p className={styles.error}>
                        { passwordForgotError ? passwordForgotError : '' }
                    </p>


                    <UnstyledButton disabled={isLoading} className={styles.submit_btn}>
                        {isLoading ? <Spinner size={25}/> : 'Log In'}
                    </UnstyledButton>

                    <p className={styles.register}>
                        {!isLoading && <span> Need an account? <Link to='/register'>Register</Link> </span>}
                    </p>
                </form>
            </div>
        </div>
  )
}
