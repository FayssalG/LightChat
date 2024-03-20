import styles from './PasswordResetSuccessAlert.module.css';
import { IoIosCloudDone } from 'react-icons/io';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useBiAnimation from '@/components/hooks/useBiAnimation';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/shared/Spinner/Spinner';
import { closePasswordResetSuccessAlert } from '@/redux/features/UiSlice';

export default function PasswordResetSuccessAlert()   {
    const dispatch = useDispatch(); 
    const showPasswordResetSuccessAlert : Boolean = useSelector(state=>state.ui.showPasswordResetSuccessAlert);
    const {shouldRender , animation ,onAnimationEnd} = useBiAnimation(showPasswordResetSuccessAlert , {enter : 'popUp' , leave:'popOut'})
    const navigate = useNavigate()

    useEffect(()=>{
        if(showPasswordResetSuccessAlert){
            setTimeout(()=>{
                dispatch(closePasswordResetSuccessAlert());
                navigate('/login')
            },2000)
        }
    },[showPasswordResetSuccessAlert])

    if(!shouldRender) return null

    return (
    <div  className={styles.container}>
        <div  onAnimationEnd={onAnimationEnd} style={{animation : animation }}    className={styles.inner_container}>
            <IoIosCloudDone className={styles.icon}/>
            <p className={styles.message}>
                Password has been reset Successfully
            </p>
            <Spinner className={styles.spinner} size={25}/>
        </div>
    </div>
  )
}
