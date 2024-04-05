import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './Register.module.css';
import useAuth from '@/components/hooks/useAuth';
import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Spinner from '@/components/shared/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/features/Auth/AuthSlice';

export default function Register() {
    const {isAuth } = useAuth();
    // const [errors  , setErrors] = useState({email : '' , displayName : '' , username:'',password:''})
    const errors = useSelector(state=>state.auth.registerError)
    const status = useSelector(state=>state.auth.registerStatus)
    const isLoading = status == 'loading'

    const dispatch = useDispatch()
    
    const emailRef = useRef(null)
    const usernameRef = useRef(null)
    const displayNameRef = useRef(null)
    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)

    const handleRegister = (e : React.FormEvent ) =>{
        e.preventDefault();
        const email = emailRef.current?.value;
        const  username = usernameRef.current?.value;
        const  displayName = displayNameRef.current?.value;
        const  password = passwordRef.current?.value;
        const  passwordConfirmation = passwordConfirmationRef.current?.value;

        dispatch(registerUser({email , displayName , username , password , passwordConfirmation}))
    }

    if(isAuth)  return <Navigate replace to={'/'} /> 

    console.log({errors})
  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <h1 className={styles.title}>Create an account</h1>
            <form onSubmit={handleRegister} className={styles.form}>
                <div className= {`${styles.input_container} ${styles.email}`} >
                    <p className={styles.label}>Email</p>
                    <input ref={emailRef} type="text" placeholder='Email' />
                    {errors?.email && <p className={styles.error}>{errors.email}</p>}
                </div>

                <div className= {`${styles.input_container} ${styles.displayname}`} >
                    <p className={styles.label}>Display Name</p>
                    <input ref={displayNameRef} type="text" placeholder='Display Name' />
                    {errors?.display_name && <p className={styles.error}>{errors.display_name}</p>}
                </div>


                <div className= {`${styles.input_container} ${styles.username}`} >
                    <p className={styles.label}>Username</p>
                    <input ref={usernameRef} type="text" placeholder='Username' />
                    {errors?.username && <p className={styles.error}>{errors.username}</p>}
                </div>


                <div className= {`${styles.input_container} ${styles.password}`} >
                    <p className={styles.label}>Password</p>
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    {errors?.password && <p className={styles.error}>{errors.password}</p>}
                </div>

                <div className= {`${styles.input_container} ${styles.confirm_password}`} >
                    <p className={styles.label}>Confirm Password</p>
                    <input ref={passwordConfirmationRef} type="password" placeholder='Confirm Password' />
                </div>

                <UnstyledButton disabled={isLoading} className={styles.submit_btn}>
                    { isLoading ? <Spinner size={25}/> : 'Create'}
                </UnstyledButton>
                
                <p className={styles.login}>
                    {!isLoading && <span>You already have an account?  <Link to='/login'>Login</Link></span>}
                </p>
            </form>
        </div>
    </div>


  )
}
