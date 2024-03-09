import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import styles from './EditModal.module.css';
import { IoClose } from 'react-icons/io5';
//redux
import { useDispatch } from 'react-redux';
import { toggleShowEditModal } from '@/redux/features/UiSlice';

export default function EditModal() {
    const dispatch = useDispatch()

    return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
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
