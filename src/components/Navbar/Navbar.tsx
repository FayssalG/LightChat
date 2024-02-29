import styles from './Navbar.module.css';
import avatar from '../../assets/avatar.png';
import { FaUserFriends } from "react-icons/fa";
import { BiSolidMessageSquare } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveSection } from '../../redux/features/UiSlice';
import UnstyledButton from '../shared/UnstyledButton/UnstyledButton';

export default function Navbar() {
    const activeSection = useSelector((state : any)=>state.ui.activeSection)
    const dispatch = useDispatch()

    
    const handleChangeSection = (newSection : string)=>{
        dispatch(changeActiveSection(newSection))
    }
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <img src={avatar} alt="avatar" />
            </div>
            
            <div className={styles.sections}>
                <UnstyledButton 
                    onClick={()=>handleChangeSection('friends')} 
                    className={styles.section+' '+styles.friends}
                >
                    <FaUserFriends />
                    <p>Friends</p>
                </UnstyledButton>

                <UnstyledButton 
                    onClick={()=>handleChangeSection('messages')} 
                    className={styles.section+' '+ styles.messages}
                >
                    
                    <BiSolidMessageSquare />
                    <p>Messages</p>

                </UnstyledButton>

                <UnstyledButton 
                    onClick={()=>handleChangeSection('groups')} 
                    className={styles.section+' '+styles.groups}
                >
                
                    <MdGroups />
                    <p>Groups</p>
                </UnstyledButton>
            </div>

            <div className={styles.logout}>
                <UnstyledButton>
                    <IoLogOut size={25}/>
                </UnstyledButton>
            </div>
        
        </div>
  )
}
