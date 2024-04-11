import {update_display_name, update_email, update_image, update_username} from '@/axios/user';
import { logoutUser, updateImage as updateImageAction } from '@/redux/features/auth/authSlice';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ProfileSettings.module.css';
import { IoArrowBack } from 'react-icons/io5';
// import EditModal from '@/components/modals/EditModal/EditModal';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/components/hooks/useAuth';
import useModal from '@/components/modal/useModal';
import { updateUser } from '@/redux/features/auth/authSlice';
import { CiLogout } from 'react-icons/ci';
import { AuthApi, useGetUserQuery, useLoginMutation, useLogoutMutation, useUpdateDisplayNameMutation, useUpdateEmailMutation, useUpdateImageMutation, useUpdateUsernameMutation } from '@/redux/features/auth/authApi';

export default function ProfileSettings() {
    const navigate = useNavigate()
  const {data:user} = useGetUserQuery(undefined);
  const {image ,display_name:displayName  , username , email } = user
  
  const [logout , {isLoading}] = useLogoutMutation();
  const {onOpen: onOpenEditModals} = useModal('EditModals')


  const  handleLogout = ()=>{
    logout(undefined)
   
  }

  
  const handleEditDisplayName = ()=>{
    onOpenEditModals({user , whatToUpdate:'displayname'});
  }
  const handleEditImage = ()=>{
    onOpenEditModals({user , whatToUpdate:'image'});
  }
  const handleEditUsername = ()=>{
    onOpenEditModals({user , whatToUpdate:'username'});
  }
  const handleEditEmail = ()=>{
    onOpenEditModals({user , whatToUpdate:'email'});
  }


  

    
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <UnstyledButton onClick={()=>navigate(-1)} className={styles.back_link}>
                <IoArrowBack/>
            </UnstyledButton>

            <UnstyledButton onClick={handleLogout} className={styles.logout_btn_container}>
                <CiLogout/>
            </UnstyledButton>
        </div>

        <div className={styles.inner_container}>
            <div className={styles.header}>
                <UnstyledButton onClick={handleEditImage}  className={styles.picture}>
                    <img src={image} alt="" />
                </UnstyledButton>


                <div className={styles.displayname_username}>
                    <h2 className={styles.displayname}>
                        {displayName}
                    </h2>
                    <p className={styles.username}>
                        @{username}
                    </p>
                </div>       
            </div>
            
            <div className={styles.settings_container}>
                <div className={styles.setting}>
                    <div>
                        <h2>Display name</h2>
                        <p>{displayName}</p>
                    </div>
                    <UnstyledButton onClick={handleEditDisplayName}>Edit</UnstyledButton>
                
                </div>

                <div className={styles.setting}>
                    <div>
                        <h2>username</h2>
                        <p>{username}</p>
                    </div>
                    <UnstyledButton onClick={handleEditUsername}>Edit</UnstyledButton>
                </div>


                <div className={styles.setting}>
                    <div>
                        <h2>Email</h2>
                        <p>{email}</p>
                    </div>
                    <UnstyledButton onClick={handleEditEmail}>Edit</UnstyledButton>
                </div>

            </div>
        </div>
        
        {/* Modals */}

        {/* {update &&  <EditModal update={update} infos={{email,displayName,username,image}} />}   */}

    </div>
    
  )
}
