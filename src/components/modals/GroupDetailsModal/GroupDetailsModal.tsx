import styles from './GroupDetailsModal.module.css';
import avatar from '@/assets/avatar.png';
import { IoClose } from 'react-icons/io5';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import Member from './Member/Member';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { closeGroupDetailsModal } from '@/redux/features/UiSlice';

export default function GroupDetailsModal() {
    const showGroupDetailsModal : Boolean = useSelector(state=>state.ui.showGroupDetailsModal);
    const dispatch : Function = useDispatch();
    const {shouldRender , onAnimationEnd , animation} = useBiAnimation(showGroupDetailsModal , {enter:'popUp',leave:'popOut'})

    if(!shouldRender) return null

    return (
    <div className={styles.container}>
        <div onAnimationEnd={onAnimationEnd} style={{animation}} className={styles.inner_container}>
            <UnstyledButton className={styles.close} onClick={()=>dispatch(closeGroupDetailsModal())} >
                <IoClose/>
            </UnstyledButton>
      
            <div className={styles.header}>
                <div className={styles.picture}>
                    <img src={avatar} alt="" />
                </div>         
                <div className={styles.groupname}>
                    Efootball
                </div>       
            </div>

            <div className={styles.body}>
                <p>Members</p>
                <div className={styles.members_list}>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>
                    <Member/>

                </div>
            </div>

            <div className={styles.footer}>
                <UnstyledButton className={styles.danger_btn} >Quit the group</UnstyledButton>
            </div>
        </div>
    </div>


  )
}
