import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ResetPassword.module.css';
import { useRef, useState } from 'react';
import useAuth from '@/components/hooks/useAuth';
import { useParams, useSearchParams } from 'react-router-dom';
import Spinner from '@/components/shared/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {openPasswordResetSuccessAlert} from '@/redux/features/UiSlice';
import PasswordResetSuccessAlert from '@/components/alerts/PasswordResetSuccessAlert/PasswordResetSuccessAlert';
import { passwordReset } from '@/redux/features/auth/authSlice';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';

export default function ResetPassword() {
    const dispatch = useDispatch()
    const [resetPassword , {isLoading , error}] = useResetPasswordMutation();
    const errors = error?.data?.errors
    
    const {token } = useParams()
    const [query , setQuery] = useSearchParams()

    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)

    const handleReset = (e : React.FormEvent)=>{
        e.preventDefault();
        const email : string | null = query.get('email');
        const password : string = passwordRef.current.value;
        const password_confirmation : string   = confirmRef.current.value        
    
        resetPassword({token,email,password,password_confirmation})
        .then(()=>{
            dispatch(openPasswordResetSuccessAlert())
        })
    }
    

    return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            
            <form onSubmit={handleReset} className={styles.form}>
            
                <h1 className={styles.title}>Reset Your Password</h1>
                
                <div className={styles.input_container}>
                    <p className={styles.label}>New Password</p>
                    <input ref={passwordRef} type="password" />
                </div>

                <div className={styles.input_container}>
                    <p className={styles.label}>Confirm new password</p>
                    <input ref={confirmRef} type="password" />
                </div>
                {
                    (errors && errors?.length) &&
                    <ul className={styles.errors}>
                        {errors.map((err)=><li className={styles.error}>{err}</li>)}
                    </ul>
                    
                }

                <UnstyledButton disabled={isLoading}>
                    {isLoading ? <Spinner size={25}/> : 'Reset your password'  }
                </UnstyledButton>
            </form>
        
        </div>
        
        <PasswordResetSuccessAlert/>
    </div>
  )
}
