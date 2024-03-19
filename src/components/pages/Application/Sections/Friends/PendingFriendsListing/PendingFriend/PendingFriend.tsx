import styles from './PendingFriend.module.css';
import { IoMdMore } from "react-icons/io";
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmRemoveFriendModal, setIsLoading } from '@/redux/features/UiSlice';
import { IoClose } from 'react-icons/io5';
import { accept_friend_request, cancel_friend_request, ignore_friend_request } from '@/axios/friend';
import { addFriend, removeRequest, setIsLoadingFriend } from '@/redux/features/FriendSlice';
import Spinner from '@/components/shared/Spinner/Spinner';


export default function PendingFriend({pendingFriend} : {pendingFriend:FriendRequest}  ) {
  const user = useSelector(state=>state.auth.user);
  const dispatch = useDispatch()
  
  
  const handleAccept = ()=>{
    dispatch(setIsLoadingFriend(true));
    // console.log({pendingFriend})
    accept_friend_request(pendingFriend.request_id)
    .then((res)=>{
      if(res.status == 200){
        dispatch(removeRequest(pendingFriend.request_id))
        dispatch(addFriend(res.data))
      }
    })
    .finally(()=>{
      dispatch(setIsLoadingFriend(false));
    })
  }

  const handleIgnore = ()=>{
    dispatch(setIsLoadingFriend(true));
    ignore_friend_request(pendingFriend.request_id)
    .then((res)=>{
      if(res.status == 200){
        dispatch(removeRequest(pendingFriend.request_id));
      }
      console.log(res);
    })
    .finally(()=>{
      dispatch(setIsLoadingFriend(false));
   
    })
  }

  const handleCancel = ()=>{
    dispatch(setIsLoadingFriend(true));
    cancel_friend_request(pendingFriend.request_id)
    .then((res)=>{
      if(res.status == 200){
          dispatch(removeRequest(pendingFriend.request_id));  

        }
      console.log(res);
    })
    .finally(()=>{
      dispatch(setIsLoadingFriend(false));   
    })
  }
 
  console.log(pendingFriend);

  const renderActions = ()=>{
    if(pendingFriend.sender_id == user.id){
      return (
        <UnstyledButton title='Cancel' className={styles.cancel_btn} onClick={handleCancel}>
          <IoClose/>
        </UnstyledButton>
      )
    } 
    else{
      return(
        <div className={styles.accept_ignore} >
          <UnstyledButton className={styles.accept_btn} onClick={handleAccept}>
              Accept
          </UnstyledButton>
          <UnstyledButton className={styles.ignore_btn} onClick={handleIgnore}>
              Ignore
          </UnstyledButton>
        </div> 
      )
    }
  }
  return (
    <>
         <div className={styles.friend}>
              <div className={styles.picture}>
                <img src={pendingFriend.image} alt="avatar" />
              </div>

              <div className={styles.displayname_username}>
                <UnstyledButton className={styles.displayname}>
                    {pendingFriend.display_name}
                </UnstyledButton>
                <UnstyledButton className={styles.username}>
                    @{pendingFriend.username}
                </UnstyledButton>
          
              </div>

              {renderActions()}
          </div>
    </>
  )
}
