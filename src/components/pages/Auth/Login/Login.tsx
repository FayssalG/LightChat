import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './Login.module.css';
import { CgSpinner } from 'react-icons/cg';

import useAuth from '@/components/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import Spinner from '@/components/shared/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useForgotPasswordMutation, useLoginMutation } from '@/redux/features/auth/authApi';

export default function Login() {
    const [login , {isLoading:isLoadingLogin , error:loginErrs}] = useLoginMutation();    
    const [forgotPassword , {isLoading:isLoadingForgotPassword , error:forgotPasswordErr,reset:resetForgotPassword}] = useForgotPasswordMutation()

    const isLoading = isLoadingForgotPassword || isLoadingLogin
    
    const loginErrors : {email:[string?] , password:[string?]}  = loginErrs?.data?.errors
    const forgotPasswordError : string = forgotPasswordErr?.data?.message

    const token : string = useSelector(state=>state.auth.token);
    const emailRef  = useRef<HTMLInputElement >(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    function handleLogin(e : React.FormEvent) {
        e.preventDefault()
        const email  = emailRef?.current?.value;
        const password = passwordRef?.current?.value;

        resetForgotPassword();
        login({email,password})
    }

    function handleForgot(e : React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const email  = emailRef?.current?.value;
      
        forgotPassword({email})            
    }
    
    if(token)  return <Navigate replace to={'/'} /> 

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <h1 className={styles.title}>Log in</h1>
                <form onSubmit={handleLogin} className={styles.form}>
                    <div className= {`${styles.input_container} ${styles.email}`} >
                        <p className={styles.label}>Email</p>
                        <input ref={emailRef} type="text" placeholder='Email' />
                        { loginErrors?.email && 
                            <p className={styles.error}>{loginErrors?.email}</p>
                        }
                        {
                          forgotPasswordError && 
                              <p className={styles.error}>{forgotPasswordError}</p> 
                        }
                    </div>

                    <div className= {`${styles.input_container} ${styles.password}`} >
                        <p className={styles.label}>Password</p>
                        <input ref={passwordRef} type="password" placeholder='Password' />
                        { loginErrors?.password && <p className={styles.error}>{loginErrors?.password}</p>}
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

                    {(loginErrors && !loginErrors?.email && !loginErrors?.password)
                        && 
                        <p className={styles.error}>{loginErrors}</p>
                    }

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
