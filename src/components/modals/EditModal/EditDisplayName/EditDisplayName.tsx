import UnstyledButton from "@/components/shared/UnstyledButton/UnstyledButton"
import { IoClose } from "react-icons/io5"
import styles from './EditDisplayName.module.css';

interface EditDisplayNameProps {
    onClose : Function,
    onSubmit :(e:React.FormEvent<HTMLFormElement>)=>void,
    old : string,
    infoRef :  React.RefObject<HTMLInputElement>,
    passwordRef : React.RefObject<HTMLInputElement>
}


export default function EditDisplayName(props : EditDisplayNameProps) {
    const {onClose, onSubmit , old , infoRef,passwordRef} = props;

  return (
    <>
        <div className={styles.header}>
            <div >
                <h2 className={styles.title}>Change your display name</h2>
                <p className={styles.comment}>Enter a new display name and your password</p>
            </div>
            <UnstyledButton onClick={onClose} className={styles.close}>
                <IoClose/>
            </UnstyledButton>
        </div>

            <form id='form' onSubmit={onSubmit} className={styles.body}>
                <div className={styles.input}>
                    <label htmlFor="">Display name</label>
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
