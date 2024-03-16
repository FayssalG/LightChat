import {update_display_name, update_email, update_image, update_username} from '@/axios/user';

import avatar from '@/assets/avatar.png';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './ProfileSettings.module.css';
import { IoArrowBack } from 'react-icons/io5';
import EditModal from '@/components/modals/EditModal/EditModal';

//redux
import { useDispatch } from 'react-redux';
import { toggleShowEditModal } from '@/redux/features/UiSlice';
import { Link } from 'react-router-dom';
import useAuth from '@/components/hooks/useAuth';
import { useRef, useState } from 'react';

export default function ProfileSettings() {

  const [update , setUpdate] : [{updateTarget:string , updateFn:Function} | null , Function] = useState(null);
  const { user} = useAuth()
  const dispatch = useDispatch()

  const [image , setImage] = useState(user.image || avatar);
  const [displayName , setDisplayName] = useState(user.display_name);
  const [username , setUsername] = useState(user.username);
  const [email , setEmail ] = useState(user.email);

  const handleClick = (newUpdate : {updateTarget:string,updateFn:Function})=>{
    setUpdate(newUpdate)
    dispatch(toggleShowEditModal());
  }

  const updateImage = async (image : File | undefined , password : string)=>{
    if(image){
        const res = await update_image(user.id , image , password)
        console.log(res.data)
        if([200,201,202,204].includes(res.status)) setImage(res.data);
        return  res;
    }
  }

  const updateDisplayName = async (newDisplayName : string , password : string)=>{    
    const res = await update_display_name(user.id , newDisplayName , password)
    console.log(res)
    if([200,201,202,204].includes(res.status)) setDisplayName(res.data);
    return  res;
  }

  const updateUsername = async (newUsername : string , password:string)=>{
    const res = await update_username(user.id , newUsername , password)
    if([200,201,202,204].includes(res.status)) setUsername(res.data);
    return  res;  
}

  const updateEmail = async (newEmail : string , password:string)=>{
    const res = await update_email(user.id , newEmail , password);
    if([200,201,202,204].includes(res.status)) setEmail(res.data);
    return  res;
  }

    
  return (
    <div className={styles.container}>
        <Link to='/' className={styles.back}>
            <IoArrowBack/>
        </Link>
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <UnstyledButton onClick={()=>handleClick({updateTarget:'picture',updateFn:updateImage})}  className={styles.picture}>
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
                    <UnstyledButton onClick={()=>handleClick({updateTarget:'displayname',updateFn:updateDisplayName})}>Edit</UnstyledButton>
                
                </div>

                <div className={styles.setting}>
                    <div>
                        <h2>username</h2>
                        <p>{username}</p>
                    </div>
                    <UnstyledButton onClick={()=>handleClick({updateTarget:'username',updateFn:updateUsername})}>Edit</UnstyledButton>
                </div>


                <div className={styles.setting}>
                    <div>
                        <h2>Email</h2>
                        <p>{email}</p>
                    </div>
                    <UnstyledButton onClick={()=>handleClick({updateTarget:'email',updateFn:updateEmail})}>Edit</UnstyledButton>
                </div>

            </div>
        </div>
        
        {/* Modals */}
        {update &&  <EditModal update={update} infos={{email,displayName,username,image}} />}  
    </div>
    
  )
}
