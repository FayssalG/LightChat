import {FileIcon} from 'react-file-icon';
import { CgClose } from 'react-icons/cg';
import styles from './AttachmentPreview.module.css';

export default function AttachmentPreview({attachment , setAttachment}) {

  if(!attachment) return null
  
  const handleCloseAttachment = ()=>{
    setAttachment(null)
  }
  
  const renderAttachment = ()=>{
    console.log({attachment})
    if(attachment.type.split('/')[0] == 'image'){
      const attachmentUrl = URL.createObjectURL(attachment);
      return <img className={styles.image_attachment} src={attachmentUrl} alt="" />      
    }
    else if(attachment.type.split('/')[0] == 'video'){
      const attachmentUrl = URL.createObjectURL(attachment);
      return <video className={styles.image_attachment} src={attachmentUrl} alt="" />      

    }
    
    else{
      const attachmeExtension = attachment.name.slice((attachment.name.lastIndexOf('.')-1 >>> 0) + 2);
      console.log({attachmeExtension})
      return (
        <div className={styles.file_attachment}>
          <FileIcon extension={attachmeExtension} ></FileIcon>
          <p className={styles.attachment_name}>{attachment.name}</p>
        </div>
      )
    }
  }

  

  return (
    <div className={styles.container}>
        <CgClose className={styles.close} onClick={handleCloseAttachment}/>

        {renderAttachment()}
    </div>
  )
}
