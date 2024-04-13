import { BaseModal } from '../BaseModal';
import styles from './DisplayImageModal.module.css';

export default function DisplayImageModal(props) {
  const {imageSrc , isOpen , onClose} = props
  
  return (
    <BaseModal show={isOpen} onClose={onClose}>
      <div className={styles.inner_container}>
        <img src={imageSrc} alt="" />
      </div>
    </BaseModal>
  )
}
