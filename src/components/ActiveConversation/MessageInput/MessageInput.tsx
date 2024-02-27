import styles from './MessageInput.module.css';
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

export default function MessageInput() {
  return (
    <form className={styles.message_input}>
            <button className={styles.attach_btn}>
                <CiCirclePlus/>
            </button>
            <input type="text" placeholder='Type a message...' />

            <button className={styles.send_btn}>
                <IoSend/>
            </button>
    </form>
  )
}
