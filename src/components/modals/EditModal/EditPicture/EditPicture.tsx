import avatar from '@/assets/avatar.png';
import UnstyledButton from "@/components/shared/UnstyledButton/UnstyledButton"
import { IoClose } from "react-icons/io5"
import styles from './EditPictue.module.css';

interface EditPictureProps {
    onClose : Function,
    old : string | null,
    infoRef :  React.RefObject<HTMLInputElement>,
    passwordRef : React.RefObject<HTMLInputElement>
}

export default function EditPicture(props : EditPictureProps) {
  const {onClose , old , infoRef,passwordRef} = props;

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

            <div className={styles.body}>
                <div className={styles.picture}>
                    <img src={old ?? avatar} alt="" />
                    <input ref={infoRef} name='image' type="file" />
                </div>

                <div className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input ref={passwordRef} type="text" />
                </div>
            </div>
    
    </>
  )
  
}
