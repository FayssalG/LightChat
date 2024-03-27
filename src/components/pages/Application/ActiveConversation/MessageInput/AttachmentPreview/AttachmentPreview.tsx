import { CgClose } from 'react-icons/cg';
import styles from './AttachmentPreview.module.css';

export default function AttachmentPreview({attachment , setAttachment}) {

  if(!attachment) return null
  
  const handleCloseAttachment = ()=>{
    setAttachment(null)
  }
  
  const attachmentObjectUrl = ()=>{
    const url = URL.createObjectURL(attachment);
    return url
  }

  return (
    <div className={styles.container}>
        <CgClose className={styles.close} onClick={handleCloseAttachment}/>
        <img className={styles.preview} src={attachmentObjectUrl()} alt="" />
    </div>
  )
}
