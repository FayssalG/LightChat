import useAuth from '@/components/hooks/useAuth';
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import styles  from './EmailNotVerified.module.css';
import Spinner from '../../../shared/Spinner/Spinner';
import { useState } from 'react';
import { MdDone } from 'react-icons/md';
import { useSendEmailVerificationMutation } from '@/redux/features/auth/authApi';

export default function EmailNotVerified() {
  const [sendEmailVerification , {isLoading}] = useSendEmailVerificationMutation()
  const [emailSent , setEmailSent] = useState(false)

  const handleSendVerificationEmail = ()=>{
      sendEmailVerification(null)
      .then(()=>{
        setEmailSent(true);
      })
  }


  return (
    <div className={styles.container}>
        <p className={styles.message}>Please check your email to verify you account.</p>
        {  
            emailSent ?
              <p className={styles.email_sent}><MdDone/> email sent</p>
            :
            isLoading ?
            <Spinner size={20}/>
            :
            <UnstyledButton
                disabled={emailSent} 
                onClick={handleSendVerificationEmail} 
                className={styles.resend}
            >
                Resend 
            </UnstyledButton>
          
        }

    </div>
  )
}
