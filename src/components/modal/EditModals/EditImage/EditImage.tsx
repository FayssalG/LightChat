import styles from '../EditModal.module.css';
import { useEffect, useRef, useState } from 'react';
import { BaseModal } from '../../BaseModal';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useUpdateImageMutation } from '@/redux/features/auth/authApi';


export default function EditImage(props) {
    const {user  , onClose , isOpen} = props;
    const [updateImage , {isLoading ,error}] = useUpdateImageMutation(); 
    
    const errors = error?.data?.errors
    const imageRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [imagePreivew , setImagePreview] = useState(user.image);

    const handleChange=(e)=>{
        const imageFile = e.target?.files?.[0]
        if(imageFile){
            const url = URL.createObjectURL(imageFile);
            setImagePreview(url);
        }
    }

    const handleUpdate = (e:React.FormEvent)=>{
        e.preventDefault();
        updateImage({id:user.id , image:imageRef.current?.files[0] , password:passwordRef?.current?.value})
        .then(()=>onClose());
    }

   



    
    return (
    <BaseModal onClose={onClose} show={isOpen} >
        <div className={styles.inner_container}>

                <div className={styles.header}>
                    <Header onClose={onClose} />
                </div>

                <form id="form" onSubmit={handleUpdate} className={styles.body}>
                    <div className={styles.picture}>
                        <img src={imagePreivew} alt="" />
                        <input ref={imageRef} onChange={handleChange} name='image' type="file" />
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
