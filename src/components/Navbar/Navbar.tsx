import styles from './Navbar.module.css';
import avatar from '../../assets/avatar.png';
import { FaUserFriends } from "react-icons/fa";
import { BiSolidMessageSquare } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveSection } from '../../redux/features/UiSlice';

export default function Navbar() {
    const activeSection = useSelector((state : any)=>state.ui.activeSection)
    const dispatch = useDispatch()

    console.log(activeSection)

    const handleChangeSection = (newSection : string)=>{
        dispatch(changeActiveSection(newSection))
    }
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <img src={avatar} alt="avatar" />
            </div>
            
            <div className={styles.sections}>
                <button 
                    onClick={()=>handleChangeSection('friends')} 
                    className={styles.section+' '+styles.sidebar_btn+' '+styles.friends}
                >
                    <FaUserFriends />
                    <p>Friends</p>
                </button>

                <button 
                    onClick={()=>handleChangeSection('messages')} 
                    className={styles.section+' '+styles.sidebar_btn +' '+ styles.messages}
                >
                    
                    <BiSolidMessageSquare />
                    <p>Messages</p>

                </button>

                <button 
                    onClick={()=>handleChangeSection('groups')} 
                    className={styles.section+' '+styles.sidebar_btn+' '+styles.groups}
                >
                
                    <MdGroups />
                    <p>Groups</p>
                </button>
            </div>

            <div className={styles.logout}>
                <button className={styles.sidebar_btn }>
                    <IoLogOut size={25}/>
                </button>
            </div>
        
        </div>
  )
}
