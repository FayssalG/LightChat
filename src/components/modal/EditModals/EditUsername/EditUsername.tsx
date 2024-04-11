import styles from '../EditModal.module.css';
import { useEffect, useRef, useState } from 'react';
import { BaseModal } from '../../BaseModal';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useUpdateUsernameMutation } from '@/redux/features/auth/authApi';


export default function EditUsername(props) {
    const {user  , onClose , isOpen} = props;
    const [updateUsername , {isLoading ,error}] = useUpdateUsernameMutation(); 
    
    const errors = error?.data?.errors
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
 
    
    //empty errors when modal closes
    const handleUpdate = (e:React.FormEvent)=>{
        e.preventDefault();
        updateUsername({username:usernameRef?.current?.value , password:passwordRef?.current?.value})
        .then(()=>onClose());
    }

   



    
    return (
    <BaseModal onClose={onClose} show={isOpen} >
        <div className={styles.inner_container}>

                <div className={styles.header}>
                    <Header onClose={onClose} />
                </div>

                <form id="form" onSubmit={handleUpdate} className={styles.body}>
                    <div className={styles.input}>
                        <label htmlFor="">Username</label>
                        <input ref={usernameRef} defaultValue={user.username} type="text" />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="">Password</label>
                        <input ref={passwordRef} type="password" />
                    </div>
                </form>  

                <div className={styles.errors}>
                    {
                    errors?.map((err)=><p>{err}</p>)
                    }
                </div>
        
            <div className={styles.footer}>
                <Footer onClose={onClose} isLoading={isLoading}/>
            </div>
        

        </div>
    </BaseModal>
  )
}
