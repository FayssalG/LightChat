import { Link, useLocation } from 'react-router-dom'
;
import styles from './Navbar.module.css';
import avatar from '../../../../assets/avatar.png';
import { BiMessageSquare} from "react-icons/bi";
import UnstyledButton from '../../../shared/UnstyledButton/UnstyledButton';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { useGetUserQuery, useLogoutMutation } from '@/redux/features/auth/authApi';
import { GoPerson } from 'react-icons/go';
import { CiLogout } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveSection } from '@/redux/features/UiSlice';

export default function Navbar() {
    const activeSection = useSelector(state=>state.ui.activeSection);
    const dispatch = useDispatch();
    const {data:user} = useGetUserQuery(undefined);
    const [logout] = useLogoutMutation();
    
    
    const handleLogout = ()=>{
        logout(undefined)
    }
    

    return (
        <div className={styles.container}>
            
            <div className={styles.inner_container}>

                <div className={styles.user_link_container}>
                    <Link to='/profil' className={styles.user_link}>
                        <img src={user.image || avatar} alt="avatar" />
                    </Link>
                </div>

                <UnstyledButton onClick={()=>dispatch(changeActiveSection('friends'))} 
                    className={`${activeSection=='friends' ? styles.active : ''} ${styles.section_link} ${styles.friends} ` }
                >
                    <GoPerson/>
                    <p>Friends</p>
                </UnstyledButton>

                <UnstyledButton onClick={()=>dispatch(changeActiveSection('conversations'))} 
                    className={`${activeSection=='conversations' ? styles.active : ''} ${styles.section_link} ${styles.conversations} ` }
                
                >
                    
                    <BiMessageSquare />
                    <p>Messages</p>

                </UnstyledButton>

                <UnstyledButton onClick={()=>dispatch(changeActiveSection('groups'))} 
                    className={`${activeSection=='groups' ? styles.active : ''} ${styles.section_link} ${styles.groups} ` }                
                >
                
                    <LiaUserFriendsSolid />
                    <p>Groups</p>
                </UnstyledButton>
         
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
