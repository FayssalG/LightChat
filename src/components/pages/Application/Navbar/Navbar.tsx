import { Link } from 'react-router-dom'
;
import styles from './Navbar.module.css';
import avatar from '../../../../assets/avatar.png';
import { FaUserFriends } from "react-icons/fa";
import { BiSolidMessageSquare } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import {  changeVisibleSection } from '../../../../redux/features/UiSlice';
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import useAuth from '@/components/hooks/useAuth';

export default function Navbar() {
    const visibleSection : string = useSelector(state=>state.ui.visibleSection);
    const dispatch = useDispatch();
    const {logoutUser , authenticatedUser:user} = useAuth()

    const handleVisibleSection = (newSection : string)=>{
        dispatch(changeVisibleSection(newSection))
    }

    return (
        <div className={styles.container}>
            <Link to='/profil' className={styles.user}>
                <img src={user.image ? user.image.url : avatar} alt="avatar" />
            </Link>
            
            <div className={styles.sections}>
                <UnstyledButton 
                    onClick={()=>handleVisibleSection('friends')} 
                    className={`${visibleSection=='friends' ? styles.active : ''} ${styles.section} ${styles.friends} ` }
                >
                    <FaUserFriends />
                    <p>Friends</p>
                </UnstyledButton>

                <UnstyledButton 
                    onClick={()=>handleVisibleSection('conversations')} 
                    className={`${visibleSection=='conversations' ? styles.active : ''} ${styles.section} ${styles.conversations} ` }
                
                >
                    
                    <BiSolidMessageSquare />
                    <p>Messages</p>

                </UnstyledButton>

                <UnstyledButton 
                    onClick={()=>handleVisibleSection('groups')} 
                    className={`${visibleSection=='groups' ? styles.active : ''} ${styles.section} ${styles.groups} ` }
                
                >
                
                    <MdGroups />
                    <p>Groups</p>
                </UnstyledButton>
            </div>

            <div className={styles.logout}>
                <UnstyledButton onClick={logoutUser}>
                    <IoLogOut size={25}/>
                </UnstyledButton>
            </div>
        
        </div>
  )
}
