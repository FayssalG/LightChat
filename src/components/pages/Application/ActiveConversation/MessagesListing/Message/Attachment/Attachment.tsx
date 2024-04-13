import {FileIcon ,  defaultStyles} from 'react-file-icon';
import styles from './Attachment.module.css'
import { GoFile } from "react-icons/go";
import useModal from '@/components/modal/useModal';

export default function Attachment({attachment}) {
    const {onOpen:onOpenDisplayImageModal} = useModal('DisplayImageModal');

    const handleDisplayImage = ()=>{
      onOpenDisplayImageModal({imageSrc:attachment.url})
    }

    const renderAttachmeent = ()=>{
        if(attachment){
          const [type] =attachment.type.split('/');
          const extension = attachment.name.split('.')[1];
          switch(type){
            case 'image':
              return <img onClick={handleDisplayImage} className={styles.image_attachment} src={attachment.url}></img>
            
            case 'video':
              return <video className={styles.video_attachment} controls src={attachment.url}></video>

            case 'application':
              return (
                <>
                    <div className={styles.file_attachment} >
                      <FileIcon extension={extension}  {...defaultStyles[extension]} color='red' />
                    </div>
                    <div className={styles.attachment_name}>
                        <a target="_blank"  href={attachment.url}>{attachment.name}</a>
                    </div>
                </>
              )
          }
        }
      }
    
  return (
    <>
        
        {renderAttachmeent()}
    </>
  )
}
