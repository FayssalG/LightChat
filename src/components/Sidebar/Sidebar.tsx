import styles from './Sidebar.module.css';
import avatar from '../../assets/avatar.png';
import { FaUserFriends } from "react-icons/fa";
import { BiSolidMessageSquare } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";



export default function Sidebar() {
  return (
    <div className={styles.container}>
        <div className={styles.user}>
            <img src={avatar} alt="avatar" />
        </div>
        
        <div className={styles.sections}>
            <button className={styles.section+' '+styles.sidebar_btn+' '+styles.friends}>
                <FaUserFriends size={30}/>
                <p>Friends</p>
            </button>

            <button className={styles.section+' '+styles.sidebar_btn +' '+ styles.messages}>
                <BiSolidMessageSquare size={30}/>
                <p>Messages</p>

            </button>

            <button className={styles.section+' '+styles.sidebar_btn+' '+styles.groups}>
                <MdGroups size={30}/>
                <p>Groups</p>
            </button>
        </div>

        <div className={styles.logout}>
            <button className={styles.sidebar_btn }>
                <IoLogOut size={30}/>
            </button>
        </div>
       
    </div>
  )
}
