import styles from './MessageInput.module.css';
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import UnstyledButton from '../../shared/UnstyledButton/UnstyledButton';

export default function MessageInput() {
  return (
    <form className={styles.message_input}>
            <UnstyledButton className={styles.attach_btn}>
                <CiCirclePlus/>
            </UnstyledButton>
            <input type="text" placeholder='Type a message...' />

            <UnstyledButton className={styles.send_btn}>
                <IoSend/>
            </UnstyledButton>
    </form>
  )
}
