import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './AddFriendModal.module.css';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeAddFriendModal, setIsLoading } from '@/redux/features/UiSlice';
import { useRef, useState } from 'react';
import { send_friend_request } from '@/axios/friend';
import { AxiosResponse } from 'axios';
import Spinner from '@/components/shared/Spinner/Spinner';
import {  addRequest, setIsLoadingFriend } from '@/redux/features/FriendSlice';

export default function AddFriendModal() { 
  const showAddFriendModal = useSelector((state)=>state.ui.showAddFriendModal);
  const isLoadingFriend = useSelector((state)=>state.friend.isLoadingFriend);
  const dispatch = useDispatch();
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors , setErrors] : [[string?] , Function] = useState([]);
  const [success  , setSuccess] : [string |null ,  Function] = useState(null);
  

  const handleSend = (e : React.FormEvent)=>{
      e.preventDefault();

      if(inputRef.current) {
        const username = inputRef.current.value;
        setErrors([]);
        setSuccess(null);  
        dispatch(setIsLoadingFriend(true))

        send_friend_request(username)
        .then((res : AxiosResponse) => {
          if(res.status == 201){
              // console.log({test:res.data});
              dispatch(addRequest(res.data));
              setSuccess("Request sent successfully!");
              setErrors([]);
          }
        })
        .catch((err)=>{
         
          setSuccess(null);
          setErrors(err.response.data.errors);
        })
        .finally(()=>{
          dispatch(setIsLoadingFriend(false))  
        })

      }
  }

  const {shouldRender , animation , onAnimationEnd} = useBiAnimation(showAddFriendModal,{enter:'popUp' , leave:'popOut'});
 
  if(!shouldRender) return null

  return (
    <div className={styles.container}>
        <div onAnimationEnd={onAnimationEnd} style={{animation:animation}} className={styles.inner_container}>
            <UnstyledButton onClick={()=>dispatch(closeAddFriendModal())} className={styles.close}>
                <IoClose/>
            </UnstyledButton>
            <form onSubmit={handleSend}>
                <input ref={inputRef} placeholder='Type a username...' />

                <div className={styles.message}>
                  {errors.length > 0 && errors.map((error)=><p className={styles.error}>{error}</p>)}
                  {success &&  <p className={styles.success}>{success}</p>}
                </div>

                <UnstyledButton disabled={isLoadingFriend}>
                  {isLoadingFriend ? <Spinner size={25}/> : 'Send Friend Request' } 
                </UnstyledButton>
            </form>
        </div>
    </div>

  )
}
