import UnstyledButton from "@/components/shared/UnstyledButton/UnstyledButton";
import { IoClose } from "react-icons/io5";
import styles from './Header.module.css'

export default function Header({onClose}) {
  return (
    <>    
        <div>
            <h2 className={styles.title}>Change your Username</h2>
            <p className={styles.comment}>Enter a new username and your password</p>
        </div>
        <UnstyledButton onClick={onClose} className={styles.close}>
            <IoClose/>
        </UnstyledButton>
    </>
    )
}
