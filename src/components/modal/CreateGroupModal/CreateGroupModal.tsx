import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './CreateGroupModal.module.css';
import avatar from '@/assets/avatar.png';
import FriendToAdd from './FriendToAdd/FriendToAdd';
import { BaseModal } from '../BaseModal';
import { useGetFriendsQuery } from '@/redux/features/friend/friendApi';
import { useState } from 'react';
import { useCreateGroupMutation } from '@/redux/features/group/groupApi';
import Spinner from '@/components/shared/Spinner/Spinner';

export default function CreateGroupModal(props) {
    const [createGroup , {isLoading , error}] = useCreateGroupMutation();
    const {data:friends} = useGetFriendsQuery(undefined);
    const [imagePreivew , setImagePreview] = useState();

    console.log({error})
    const handleChange=(e)=>{
        const imageFile = e.target?.files?.[0]
        if(imageFile){
            const url = URL.createObjectURL(imageFile);
            setImagePreview(url);
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const group_image = formData.get('group_image');
        const group_name = formData.get('group_name');
        
        const members_ids = formData.getAll('member');

        console.log({group_name,group_image , members_ids})
        const data = {
            group_name,
            members_ids
        }
        if(group_image) data.group_image = group_image;
        createGroup(data);
    }
    

    return (
    <BaseModal show={props.isOpen} onClose={props.onClose}>
        <form onSubmit={handleSubmit} className={styles.inner_container}>
            <div className={styles.header}>
            </div>

            <div className={styles.body}>
                <div className={styles.group_picture}>
                    <img src={imagePreivew ?? avatar} alt="" />
                    <input  onChange={handleChange} name='group_image' type="file" />
                </div>

                <div className={styles.group_name}>
                    <input type="text" name='group_name' placeholder='Group name...' />
                </div>

                <div className={styles.group_members}>
                    <h3>Select Members</h3>
        
                    <div className={styles.friends_list}>
                        {
                            friends.map((f)=>
                                <FriendToAdd friend={f}/>
                            )
                        }                    
                    </div>
                </div>
                <div className={styles.error}>
                    <p>{error?.data?.errors?.group_name}</p>   
                    <p>{error?.data?.errors?.members_ids}</p>   
                </div>
            </div>

            <div className={styles.footer}>
                <UnstyledButton style={{backgroundColor:isLoading??'grey'}} className={styles.confirm_btn}>
                    {isLoading ?
                        <Spinner/>
                        : 
                        'Create'
                    }
                </UnstyledButton>
                <UnstyledButton onClick={props.onClose} className={styles.cancel_btn}>Cancel</UnstyledButton>
            </div>
        </form>
    </BaseModal>
  )
}
