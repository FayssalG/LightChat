import UnstyledButton from "@/components/shared/UnstyledButton/UnstyledButton"
import { IoClose } from "react-icons/io5"
import styles from './EditUsername.module.css';

interface EditUsernameProps {
    onClose : Function,
    onSubmit : (e:React.FormEvent<HTMLFormElement>)=>void,
    old : string,
    infoRef :  React.RefObject<HTMLInputElement>,
    passwordRef : React.RefObject<HTMLInputElement>
}


export default function EditUsername(props : EditUsernameProps) {
    const {onClose,onSubmit , old , infoRef,passwordRef} = props;

  return (
    <>
        <div className={styles.header}>
            <div>
                <h2 className={styles.title}>Change your Username</h2>
                <p className={styles.comment}>Enter a new username and your password</p>
            </div>
            <UnstyledButton  onClick={onClose} className={styles.close}>
                <IoClose/>
            </UnstyledButton>
        </div>

            <form id="form" onSubmit={onSubmit} className={styles.body}>
                <div className={styles.input}>
                    <label htmlFor="">Username</label>
                    <input ref={infoRef} defaultValue={old} type="text" />
                </div>
                <div className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input ref={passwordRef} type="password" />
                </div>
            </form>  
    </>
  )
  
}
