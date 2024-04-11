import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './FriendDetailsModal.module.css';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { selectFriendById, setFriendAsUnblocked, setSelectedFriend } from '@/redux/features/friend/FriendSlice';
import useModal from '../useModal';
import { BaseModal } from '../BaseModal';
import { useUnBlockUserMutation } from '@/redux/features/block/blockApi';
import { useState } from 'react';

export default function FriendDetailsModal(props)   {
    const [unBlockUser] = useUnBlockUserMutation();
    const {friend , onClose , isOpen} = props
    const {isBlocked , isStillFriend} = friend;
    const [isBlockedState , setIsBlockedState] = useState(isBlocked)    
    const [isStillFriendState , setIsStillFriendState] = useState(isStillFriend)    



    const {onOpen: onOpenConfirmRemoveFriendModal} = useModal('ConfirmRemoveFriendModal')
    const {onOpen: onOpenConfirmBlockFriendModal} = useModal('ConfirmBlockFriendModal')
    
    const handleOpenRemoveModal = ()=>{
        onClose()
        onOpenConfirmRemoveFriendModal({friend});
    }

    const handleOpenBlockModal = ()=>{
        onClose()
        onOpenConfirmBlockFriendModal({friend})
    }

    const handleUnblock = ()=>{
        unBlockUser(friend.username)    
        .then(()=>{
            setIsBlockedState(false);
        })
    }


    
    return (
    <BaseModal show={isOpen} onClose={onClose}>
        <div className={styles.inner_container}>
            <UnstyledButton className={styles.close} onClick={onClose}>
                <IoClose/>
            </UnstyledButton>
      
            <div className={styles.header}>
                <div className={styles.picture}>
                    <img src={friend.image} alt="" />
                </div>         
                <div className={styles.displayname_username}>
                    <h2 className={styles.displayname}>
                        {friend.display_name}
                    </h2>
                    <p className={styles.username}>
                        @{friend.username}
                    </p>
                </div>       
            </div>

            <div className={styles.body}>
                <div className={styles.about}>
                    <h3>About</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quisquam, dicta ea odio necessitatibus eaque omnis? Rerum laborum velit nam cupiditate illum aperiam quia reprehenderit, quibusdam est. Quod, quia consequatur!
                    </p>
                </div>

                <div className={styles.member_since}>
                    <h3>Member since</h3>
                    <p>Jun 05, 2022</p>
                </div>
            </div>

            <div className={styles.footer}>
                <UnstyledButton onClick={()=>null} className={styles.success_btn}>Send a message</UnstyledButton>
                
                {
                    isStillFriend ?
                    <UnstyledButton className={styles.danger_btn} onClick={handleOpenRemoveModal}>Remove Friend</UnstyledButton>
                    : !isBlockedState &&
                    <UnstyledButton className={styles.success_btn} onClick={()=>null}>Send friend request</UnstyledButton>

                }

                {
                    !isBlockedState ?
                    <UnstyledButton className={styles.danger_btn} onClick={handleOpenBlockModal}>Block</UnstyledButton>
                    :
                    <UnstyledButton className={styles.success_btn} onClick={handleUnblock}>Unblock</UnstyledButton>
                }

            </div>
        </div>
    </BaseModal>
  )
}
