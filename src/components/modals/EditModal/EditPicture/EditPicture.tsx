import avatar from '@/assets/avatar.png';
import UnstyledButton from "@/components/shared/UnstyledButton/UnstyledButton"
import { IoClose } from "react-icons/io5"
import styles from './EditPictue.module.css';
import { useState } from 'react';

interface EditPictureProps {
    onClose : Function,
    onSubmit : (e:React.FormEvent<HTMLFormElement>)=>void,
    old : string ,
    infoRef :  React.RefObject<HTMLInputElement>,
    passwordRef : React.RefObject<HTMLInputElement>
}

export default function EditPicture(props : EditPictureProps) {
  const {onClose,onSubmit , old , infoRef,passwordRef} = props;
  const [imagePreivew , setImagePreview] = useState(old);
  
  //changes the image preview
  const handleChangeImage = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const imageFile = e.target?.files?.[0]
    if(imageFile){
        const url = URL.createObjectURL(imageFile);
        setImagePreview(url);
    }
  }

  return (
    <>
        <div className={styles.header}>
            <div >
                <h2 className={styles.title}>Change your Picture</h2>
                <p className={styles.comment}>Upload a new picture and type your password</p>
            </div>
            <UnstyledButton onClick={onClose} className={styles.close}>
                <IoClose/>
            </UnstyledButton>
        </div>

            <form id='form' onSubmit={onSubmit} className={styles.body}>
                <div className={styles.picture}>
                    <img src={imagePreivew} alt="" />
                    <input ref={infoRef} onChange={handleChangeImage} name='image' type="file" />
                </div>

                <div className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input ref={passwordRef} type="password" />
                </div>
            </form>
    
    </>
  )
  
}
