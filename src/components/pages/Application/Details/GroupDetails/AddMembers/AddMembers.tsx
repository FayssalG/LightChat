import { useGetFriendsQuery } from '@/redux/features/friend/friendApi';
import styles from './AddMembers.module.css';
import FriendToAdd from './FriendToAdd/FriendToAdd';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useAddMembersMutation, useGetGroupsQuery } from '@/redux/features/group/groupApi';
import Spinner from '@/components/shared/Spinner/Spinner';

export default function AddMembers({onCloseAddMembers, group}) {
    const [addMembers , {isLoading}] = useAddMembersMutation();
    const {membersIds}= useGetGroupsQuery(undefined , {
        selectFromResult : ({data})=>({
            membersIds : data?.find(g=>g.id==group.id).members.map(m=>m.id)
        })
    })
    const {friendsToAdd} = useGetFriendsQuery(undefined , {
        selectFromResult : ({data})=>({
            friendsToAdd : data?.filter(f=>!membersIds.includes(f.user_id))
        })
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const new_members_ids = formData.getAll('member').map(id=>Number(id))
        const data ={group_id:group.id  , new_members_ids} 
        addMembers(data)
        .then(()=>{
            onCloseAddMembers();
        });
    }

  
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <p>Chose members from you friends</p>
        </div>
        <form id='addmembers_form' onSubmit={handleSubmit} className={styles.body}>
            <div className={styles.friends_list}>
                {   friendsToAdd?.length ?

                    friendsToAdd.map((friend)=>
                        <FriendToAdd friend={friend}/>                    
                    )

                    :

                    <div className={styles.no_friends}>                        
                        <p>No friends to add</p>
                    </div>
                }
            </div>
        </form>
        <div className={styles.footer}>
                <UnstyledButton form='addmembers_form' className={styles.add_btn}>
                    {
                        isLoading ?
                        <Spinner/>
                        :
                        'Add'
                    }
                </UnstyledButton>
                <UnstyledButton onClick={onCloseAddMembers} className={styles.cancel_btn}>cancel</UnstyledButton>
        </div>
    </div>
  )
}
