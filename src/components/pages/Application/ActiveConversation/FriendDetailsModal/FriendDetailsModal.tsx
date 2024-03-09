import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './FriendDetailsModal.module.css';
import avatar from '@/assets/avatar.png';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { closeFriendDetailsModal } from '@/redux/features/UiSlice';
import { RefObject, useEffect, useRef } from 'react';

export default function FriendDetailsModal() {
    const modalRef : RefObject<HTMLElement> = useRef(null);
    const dispatch : Function = useDispatch();
    
    useEffect(()=>{
        const closeModal = (e : MouseEvent)=>{
            if(modalRef.current && !modalRef.current.contains(e.target)) {
                dispatch(closeFriendDetailsModal());
            }
        }; 
        document.addEventListener('click' , closeModal)
        
        return ()=>document.removeEventListener('click' , closeModal);
    },[])

    

    return (
    <div  className={styles.container}>
        <div ref={modalRef} className={styles.inner_container}>
            <UnstyledButton className={styles.close} onClick={()=>dispatch(closeFriendDetailsModal())}>
                <IoClose/>
            </UnstyledButton>
      
            <div className={styles.header}>
                <div className={styles.picture}>
                    <img src={avatar} alt="" />
                </div>         
                <div className={styles.displayname_username}>
                    <h2 className={styles.displayname}>
                        Jack Matrins
                    </h2>
                    <p className={styles.username}>
                        @jackmartins
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
                <UnstyledButton className={styles.success_btn}>Send a message</UnstyledButton>
                <UnstyledButton className={styles.danger_btn}>Remove Friend</UnstyledButton>
                <UnstyledButton className={styles.danger_btn}>Block</UnstyledButton>

            </div>
        </div>
    </div>
  )
}
