import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ResetPassword.module.css';
import { useRef, useState } from 'react';
import useAuth from '@/components/hooks/useAuth';
import { useParams, useSearchParams } from 'react-router-dom';
import Spinner from '@/components/shared/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import {openPasswordResetSuccessAlert} from '@/redux/features/UiSlice';
import PasswordResetSuccessAlert from '@/components/alerts/PasswordResetSuccessAlert/PasswordResetSuccessAlert';

export default function ResetPassword() {
    const dispatch = useDispatch()

    const {token } = useParams()
    const [query , setQuery] = useSearchParams()

    const {resetPassword , isLoading} = useAuth()
    const [errors , setErrors] : [ [string?] , Function ]   = useState([]);
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)

    const handleReset = (e : React.FormEvent)=>{
        e.preventDefault();
        const email : string | null = query.get('email');
        const password : string = passwordRef.current.value;
        const passwordConfirmation : string   = confirmRef.current.value
        
        if(token && email && password && passwordConfirmation){
            resetPassword(token,email,password,passwordConfirmation)
            .then((res)=>{
                if(res?.status == 200){
                    dispatch(openPasswordResetSuccessAlert())
                }
            })
            .catch((err)=>{
                setErrors(err.response.data.errors.password || ["Something went wrong!"])
            })
        }else{
            setErrors(["Please fill out all fields"])
        }
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
                    errors.length > 0 &&
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
