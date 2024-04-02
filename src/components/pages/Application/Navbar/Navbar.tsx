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
                    <GoPerson/>
                    <p>Friends</p>
                </Link>

                <Link to='/conversations' 
                    className={`${pathname=='/conversations' ? styles.active : ''} ${styles.section} ${styles.conversations} ` }
                
                >
                    
                    <BiMessageSquare />
                    <p>Messages</p>

                </Link>

                <Link to='/groups' 
                    className={`${pathname=='/groups' ? styles.active : ''} ${styles.section} ${styles.groups} ` }                
                >
                
                    <LiaUserFriendsSolid />
                    <p>Groups</p>
                </Link>
         
            </div>

            <div className={styles.logout}>
                <UnstyledButton onClick={logoutUser}>
                    <CiLogout />
                </UnstyledButton>
                <p>Logout</p>
            </div>
        
        </div>
  )
}
