import {update_display_name, update_email, update_image, update_username} from '@/axios/user';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ProfileSettings.module.css';
import { IoArrowBack } from 'react-icons/io5';
// import EditModal from '@/components/modals/EditModal/EditModal';

//redux
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useAuth from '@/components/hooks/useAuth';
import useModal from '@/components/modal/useModal';
import { updateUser } from '@/redux/features/Auth/AuthSlice';
import { CiLogout } from 'react-icons/ci';

export default function ProfileSettings() {

  const { user , logoutUser} = useAuth()
  const dispatch = useDispatch()
  const {onOpen : onOpenEditModal} = useModal('EditModal');

   const {image ,display_name:displayName  , username , email } = user

  const handleClick = (whatToUpdate : string , updateFn:Function)=>{
    onOpenEditModal({user , whatToUpdate , updateFn})
  }

  const updateImage = async (image : File | undefined , password : string)=>{
    if(image){
        const res = await update_image(user.id , image , password)
        console.log(res.data)
        if([200,201,202,204].includes(res.status)) dispatch(updateUser({image:res.data}));
        return  res;
    }
  }

  const updateDisplayName = async (newDisplayName : string , password : string)=>{    
    const res = await update_display_name(user.id , newDisplayName , password)
    console.log(res)
    if([200,201,202,204].includes(res.status)) dispatch(updateUser({display_name:res.data}));
    return  res;
  }

  const updateUsername = async (newUsername : string , password:string)=>{
    const res = await update_username(user.id , newUsername , password)
    if([200,201,202,204].includes(res.status)) dispatch(updateUser({username:res.data}));
    return  res;  
}

  const updateEmail = async (newEmail : string , password:string)=>{
    const res = await update_email(user.id , newEmail , password);
    if([200,201,202,204].includes(res.status)) dispatch(updateUser({email:res.data}));
    return  res;
  }

    
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <Link to='/' className={styles.back_link}>
                <IoArrowBack/>
            </Link>

            <UnstyledButton onClick={logoutUser} className={styles.logout_btn_container}>
                <CiLogout/>
            </UnstyledButton>
        </div>

        <div className={styles.inner_container}>
            <div className={styles.header}>
                <UnstyledButton onClick={()=>handleClick('picture',updateImage)}  className={styles.picture}>
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
                    <UnstyledButton onClick={()=>handleClick('displayname',updateDisplayName)}>Edit</UnstyledButton>
                
                </div>

                <div className={styles.setting}>
                    <div>
                        <h2>username</h2>
                        <p>{username}</p>
                    </div>
                    <UnstyledButton onClick={()=>handleClick('username',updateUsername)}>Edit</UnstyledButton>
                </div>


                <div className={styles.setting}>
                    <div>
                        <h2>Email</h2>
                        <p>{email}</p>
                    </div>
                    <UnstyledButton onClick={()=>handleClick('email',updateEmail)}>Edit</UnstyledButton>
                </div>

            </div>
        </div>
        
        {/* Modals */}

        {/* {update &&  <EditModal update={update} infos={{email,displayName,username,image}} />}   */}

    </div>
    
  )
}
