import styles from './PendingFriend.module.css';
import { IoMdMore } from "react-icons/io";
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmRemoveFriendModal, setIsLoading } from '@/redux/features/UiSlice';
import { IoClose } from 'react-icons/io5';
import { accept_friend_request, cancel_friend_request, ignore_friend_request } from '@/axios/friend';
import { addFriend, removePendingFriend, setIsLoadingFriend } from '@/redux/features/FriendSlice';
import Spinner from '@/components/shared/Spinner/Spinner';


export default function PendingFriend({pendingFriend} : {pendingFriend:Friend}) {
  const user = useSelector(state=>state.auth.user);
  const isLoadingFriend = useSelector(state=>state.friend.isLoadingFriend);
  const dispatch = useDispatch()
  
  
  const handleAccept = ()=>{
    dispatch(setIsLoadingFriend(true));
    accept_friend_request(pendingFriend.friendship_id)
    .then((res)=>{
      if(res.status == 200){
        dispatch(removePendingFriend(pendingFriend.id))
        dispatch(addFriend(pendingFriend))
      }
    })
    .finally(()=>{
      dispatch(setIsLoadingFriend(false));
    })
  }

  const handleIgnore = ()=>{
    dispatch(setIsLoadingFriend(true));
    
    ignore_friend_request(pendingFriend.friendship_id)
    .then((res)=>{
      if(res.status == 200){
        dispatch(removePendingFriend(pendingFriend.id));
      }
      console.log(res);
    })
    .finally(()=>{
      dispatch(setIsLoadingFriend(false));
   
    })
  }

  const handleCancel = ()=>{
    dispatch(setIsLoadingFriend(true));

    cancel_friend_request(pendingFriend.friendship_id)
    .then((res)=>{
      if(res.status == 200){
          dispatch(removePendingFriend(pendingFriend.id));  
      }
      console.log(res);
    })
    .finally(()=>{
      dispatch(setIsLoadingFriend(false));   
    })
  }
 
  console.log(pendingFriend);
  const renderActions = ()=>{
    if(pendingFriend.initiator == user.id){
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

              <UnstyledButton className={styles.name}>
                  {pendingFriend.display_name}
              </UnstyledButton>

              {
                isLoadingFriend ?
                  <Spinner size={20}/>
                :
                renderActions()
              }
          </div>
    </>
  )
}
