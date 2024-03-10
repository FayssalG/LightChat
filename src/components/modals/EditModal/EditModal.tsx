import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './EditModal.module.css';
import { IoClose } from 'react-icons/io5';
//redux
import { useDispatch , useSelector} from 'react-redux';
import { toggleShowEditModal } from '@/redux/features/UiSlice';
import useBiAnimation from '@/components/hooks/useBiAnimation';

export default function EditModal() {
    const showEditModal = useSelector(state=>state.ui.showEditModal);
    const {shouldRender , onAnimationEnd , animation} = useBiAnimation(showEditModal , {enter : 'popUp' , leave:'popOut'})
    
    const dispatch = useDispatch()

    if(!shouldRender) return null
    return (
    <div className={styles.container}>
        <div style={{animation:animation}} onAnimationEnd={onAnimationEnd} className={styles.inner_container}>
            <div className={styles.header}>
                <div >
                    <h2 className={styles.title}>Change your display name</h2>
                    <p className={styles.comment}>Enter a new display name and your password</p>
                </div>
                <UnstyledButton onClick={()=>dispatch(toggleShowEditModal())} className={styles.close}>
                    <IoClose/>
                </UnstyledButton>
            </div>

            <div className={styles.body}>
                <div className={styles.input}>
                    <label htmlFor="">Display name</label>
                    <input type="text" />
                </div>
                <div className={styles.input}>
                    <label htmlFor="">Password</label>
                    <input type="text" />
                </div>
            </div>

            <div className={styles.footer}>
                <UnstyledButton onClick={()=>dispatch(toggleShowEditModal())} className={styles.cancel}>Cancel</UnstyledButton>
                <UnstyledButton className={styles.confirm}>Done</UnstyledButton>
            </div>
        </div>
    </div>
  )
}
