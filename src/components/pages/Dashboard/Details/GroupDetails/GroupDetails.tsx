import avatar from '@/assets/avatar.png';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './GroupDetails.module.css';
import { IoClose } from 'react-icons/io5';
import Member from './Member/Member';
import { useQuitGroupMutation, useRemoveMemberMutation } from '@/redux/features/group/groupApi';
import { useSendRequestMutation } from '@/redux/features/friendRequest/friendRequestApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeActiveSection } from '@/redux/features/UiSlice';
import AddMembers from './AddMembers/AddMembers';
import { useEffect, useState } from 'react';
import useModal from '@/components/modal/useModal';

export default function GroupDetails({onClose , group }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [removeMember] = useRemoveMemberMutation();
    const [quitGroup] = useQuitGroupMutation();
    const [addFriend] = useSendRequestMutation();

    const user= useSelector(state=>state.auth.user);
    const [shouldShowAddMembers , setShouldShowAddMembers] = useState(false);

    const isAdmin=group.admin_id==user.id;

    const handleSendMessage = (convId)=>{
        dispatch(changeActiveSection('conversations'))
        navigate('/friend/'+convId)
    }

    const {onOpen : onOpenConfirmRemoveGroupMember} = useModal('ConfirmRemoveGroupMemberModal');  
    const handleOpenConfirmRemoveMemberModal = (member)=>{
        onOpenConfirmRemoveGroupMember({member:member , group:group})
    }

    const handleQuitGroup = ()=>{
        quitGroup({group_id:group.id})
    }

    const handleAddFriend = (username)=>{
        addFriend(username);
    }

    //handle closing with the back button
    useEffect(()=>{
        window.history.pushState(null, document.title, window.location.href);

        const handleCloseOnBackButton = (event) => {
            event.preventDefault();
            onClose()
        };

        window.addEventListener('popstate', handleCloseOnBackButton);
    
        return () => window.removeEventListener('popstate', handleCloseOnBackButton);
    
    },[])


    return (
    <div  className={styles.container}>
        { shouldShowAddMembers ?
        <AddMembers onCloseAddMembers={()=>setShouldShowAddMembers(false)} group={group}/>
            :
        <>
        <UnstyledButton onClick={onClose} className={styles.close}  >
            <IoClose/>
        </UnstyledButton>

        <div className={styles.header}>
            <div className={styles.picture}>
                <img src={group.image.url} alt="" />
            </div>         
            <div className={styles.groupname}>
                {group.name}
            </div>       
        </div>

        <div className={styles.body}>
            <div className={styles.top}>
                <p>Members</p>
                {isAdmin &&
                    <UnstyledButton onClick={()=>setShouldShowAddMembers(true)} className={styles.addmembers_btn}>
                        Add members
                    </UnstyledButton>                
                }
            </div>
            <div className={styles.members_list}>
                {
                    group.members.map((member)=>{
                        if(user.id == member.id) return null    
                        return <Member 
                            key={member.id} 
                            onRemove={handleOpenConfirmRemoveMemberModal} 
                            isAdmin={isAdmin} 
                            member={member}
                            onAddFriend={handleAddFriend}
                            onSendMessage={handleSendMessage}
                        />
                    })
                }
            </div>
        </div>

        <div className={styles.footer}>
            <UnstyledButton onClick={handleQuitGroup} className={styles.danger_btn} >Quit the group</UnstyledButton>
        </div> 
        </>
        }
    </div>
    )
}
