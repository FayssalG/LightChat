import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ResetPassword.module.css';
import { useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Spinner from '@/components/shared/Spinner/Spinner';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [resetPassword , {isLoading , error}] = useResetPasswordMutation();
    const errors = error?.data?.errors
    
    const {token } = useParams()
    const [query] = useSearchParams()

    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)

    const handleReset = (e : React.FormEvent)=>{
        e.preventDefault();
        const email = query.get('email');
        const password = passwordRef?.current?.value;
        const password_confirmation   = confirmRef?.current?.value        
    
        resetPassword({token,email,password,password_confirmation})
        .then(()=>{
            toast.success('Password has been reset Successfully !',{
                position : 'top-center'
            })            
            setTimeout(()=>{
                navigate('/login')
            },2000)
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
