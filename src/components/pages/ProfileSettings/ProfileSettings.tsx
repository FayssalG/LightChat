import {update_image} from '@/axios/user';

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
import { useRef } from 'react';

export default function ProfileSettings() { 
  const {authenticatedUser : user} = useAuth()
  const imageRef = useRef<HTMLInputElement>(null)  

  const handleImageUpdate = ()=>{
    const image : File | undefined = imageRef.current?.files?.[0];

    if(image){
        update_image(user.id , image)
        .then((res)=>console.log(res))
        .catch((err)=>{
            console.log(err)
        })
    }
  }

  const dispatch = useDispatch()
    
  return (
    <div className={styles.container}>
        <Link to='/' className={styles.back}>
            <IoArrowBack/>
        </Link>
        <div className={styles.inner_container}>
            <div className={styles.header}>
                <div className={styles.picture}>
                    <img src={user.image ? user.image.url : avatar} alt="" />
                    <input ref={imageRef} onChange={handleImageUpdate} type="file" />
                </div>


                <div className={styles.displayname_username}>
                    <h2 className={styles.displayname}>
                        {user.display_name}
                    </h2>
                    <p className={styles.username}>
                        @{user.username}
                    </p>
                </div>       
            </div>
            
            <div className={styles.settings_container}>
                <div className={styles.setting}>
                    <div>
                        <h2>Display name</h2>
                        <p>{user.display_name}</p>
                    </div>
                    <UnstyledButton onClick={()=>dispatch(toggleShowEditModal())}>Edit</UnstyledButton>
                
                </div>

                <div className={styles.setting}>
                    <div>
                        <h2>username</h2>
                        <p>{user.username}</p>
                    </div>
                    <UnstyledButton>Edit</UnstyledButton>
                </div>


                <div className={styles.setting}>
                    <div>
                        <h2>Email</h2>
                        <p>{user.email}</p>
                    </div>
                    <UnstyledButton>Edit</UnstyledButton>
                </div>

            </div>
        </div>
        
        {/* Modals */}
        <EditModal/> 
    </div>
    
  )
}
