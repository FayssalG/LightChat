import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './AddFriendModal.module.css';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { send_friend_request } from '@/axios/friend';
import { AxiosResponse } from 'axios';
import Spinner from '@/components/shared/Spinner/Spinner';
import { addRequest} from '@/redux/features/friendRequest/friendRequestSlice';
import { BaseModal } from '../BaseModal';
import { useSendRequestMutation } from '@/redux/features/friendRequest/friendRequestApi';

export default function AddFriendModal(props) { 
  const [sendRequest , {isLoading , error , isSuccess}] = useSendRequestMutation();
  const dispatch = useDispatch();

  console.log({error , isSuccess})
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const handleSend = (e : React.FormEvent)=>{
      e.preventDefault();
      if(inputRef.current) {
        const username = inputRef.current.value;
        // setErrors([]);
        // setSuccess(null);  

        // send_friend_request(username)
        // .then((res : AxiosResponse) => {
        //   if(res.status == 201){
        //       // console.log({test:res.data});
        //       dispatch(addRequest(res.data));
        //       setSuccess("Request sent successfully!");
        //       setErrors([]);
        //   }
        // })
        // .catch((err)=>{
         
        //   setSuccess(null);
        //   setErrors(err.response.data.errors);
        // })

        // dispatch(sendRequest(username))
        sendRequest(username)
      }
  }

  
  return (
    <BaseModal show={props.isOpen} onClose={props.onClose}>
        <div ref={props.modalRef}  className={styles.inner_container}>
            <UnstyledButton onClick={props.onClose} className={styles.close}>
                <IoClose/>
            </UnstyledButton>
            <form onSubmit={handleSend}>
                <input ref={inputRef} placeholder='Type a username...' />

                <div className={styles.message}>
                  {error && <p className={styles.error}>{error?.data?.errors[0]}</p>}
                  {isSuccess &&  <p className={styles.success}>Request sent successfully !</p>}
                </div>

                <UnstyledButton disabled={isLoading}>
                  {isLoading ? <Spinner size={25}/> : 'Send Friend Request' } 
                </UnstyledButton>
            </form>
        </div>
    </BaseModal>

  )
}
