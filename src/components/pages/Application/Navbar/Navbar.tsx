import { Link, useLocation } from 'react-router-dom'
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
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    console.log(pathname)
    const {logoutUser , user} = useAuth()


    return (
        <div className={styles.container}>
            <Link to='/profil' className={styles.user}>
                <img src={user.image || avatar} alt="avatar" />
            </Link>
            
            <div className={styles.sections}>
                <Link to='/' 
                    className={`${pathname=='/' ? styles.active : ''} ${styles.section} ${styles.friends} ` }
                >
                    <FaUserFriends />
                    <p>Friends</p>
                </Link>

                <Link to='/conversations' 
                    className={`${pathname=='/conversations' ? styles.active : ''} ${styles.section} ${styles.conversations} ` }
                
                >
                    
                    <BiSolidMessageSquare />
                    <p>Messages</p>

                </Link>

                <Link to='/groups' 
                    className={`${pathname=='/groups' ? styles.active : ''} ${styles.section} ${styles.groups} ` }                
                >
                
                    <MdGroups />
                    <p>Groups</p>
                </Link>
            </div>

            <div className={styles.logout}>
                <UnstyledButton onClick={logoutUser}>
                    <IoLogOut size={25}/>
                </UnstyledButton>
            </div>
        
        </div>
  )
}
