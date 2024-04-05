import { Link, useLocation } from 'react-router-dom'
;
import styles from './Navbar.module.css';
import avatar from '../../../../assets/avatar.png';
import { FaUserFriends } from "react-icons/fa";
import { BiMessageSquare, BiSolidMessageSquare } from "react-icons/bi";
import { MdGroups, MdOutlineGroup } from "react-icons/md";
import { IoLogOut, IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import {  changeVisibleSection } from '../../../../redux/features/UiSlice';
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import useAuth from '@/components/hooks/useAuth';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiGroupLine } from 'react-icons/ri';
import { LuMessageSquare } from 'react-icons/lu';
import { CiLogout } from 'react-icons/ci';
import { GoPerson } from 'react-icons/go';
import { logoutUser } from '@/redux/features/Auth/AuthSlice';

export default function Navbar() {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.user)
    
    const handleLogout = ()=>{
        dispatch(logoutUser())
    }
    

    return (
        <div className={styles.container}>
            
            <div className={styles.inner_container}>

                <div className={styles.user_link_container}>
                    <Link to='/profil' className={styles.user_link}>
                        <img src={user.image || avatar} alt="avatar" />
                    </Link>
                </div>

                <Link to='/' 
                    className={`${pathname=='/' ? styles.active : ''} ${styles.section_link} ${styles.friends} ` }
                >
                    <GoPerson/>
                    <p>Friends</p>
                </Link>

                <Link to='/conversations' 
                    className={`${pathname=='/conversations' ? styles.active : ''} ${styles.section_link} ${styles.conversations} ` }
                
                >
                    
                    <BiMessageSquare />
                    <p>Messages</p>

                </Link>

                <Link to='/groups' 
                    className={`${pathname=='/groups' ? styles.active : ''} ${styles.section_link} ${styles.groups} ` }                
                >
                
                    <LiaUserFriendsSolid />
                    <p>Groups</p>
                </Link>
         
            </div>

            <div className={styles.logout}>
                <UnstyledButton onClick={handleLogout}>
                    <CiLogout />
                </UnstyledButton>
                <p>Logout</p>
            </div>
        
        </div>
  )
}
