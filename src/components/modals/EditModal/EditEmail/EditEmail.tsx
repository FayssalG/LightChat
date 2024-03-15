import UnstyledButton from "@/components/shared/UnstyledButton/UnstyledButton"
import { IoClose } from "react-icons/io5"
import styles from './EditEmail.module.css';

interface EditEmailProps {
    onClose : Function,
    old : string,
    infoRef :  React.RefObject<HTMLInputElement>,
    passwordRef : React.RefObject<HTMLInputElement>
}


export default function EditEmail(props : EditEmailProps) {
    const {  onClose , old , infoRef,passwordRef} = props;

  return (
    <>
        <div className={styles.header}>
            <div>
                <h2 className={styles.title}>Change your Email</h2>
                <p className={styles.comment}>Enter a Email and your password</p>
            </div>
            <UnstyledButton onClick={onClose} className={styles.close}>
                <IoClose/>
            </UnstyledButton>
        </div>

            <div className={styles.body}>
                <div className={styles.input}>
                    <label htmlFor="">Email</label>
                    <input ref={infoRef} value={old} type="text" />
                </div>
                <div className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input ref={passwordRef} type="password" />
                </div>
            </div>

    </>
  )
  
}
