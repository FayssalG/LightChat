import { useSelector } from 'react-redux';
import styles from './GroupMessage.module.css';
import { VscEye } from 'react-icons/vsc';
import Attachment from './Attachment/Attachment';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import {  BiTrash } from 'react-icons/bi';
import { MdModeEdit } from 'react-icons/md';
import { useDeleteMessageMutation, useUpdateMessageMutation } from '@/redux/features/Conversation/conversationApi';
import useModal from '@/components/modal/useModal';
// import { selectMessageById } from '@/redux/features/FriendConversation/FriendConversationSlice';


export default function GroupMessage({messageRef,onEdit , shouldEdit ,   message , group} : any) {
  const user = useSelector(state=>state.auth.user);  
  const {text , attachment , isSent , isSeen} = message;

  const type = message?.sender_id == user.id ? 'self' : null;
  let message_style_classname = type == 'self' ? styles.message_self : styles.message_other  
  
  const handleUpdate = (e)=>{
      e.preventDefault()
      const formData = new FormData(e.target)
      onEdit(null)
  }

  const {onOpen:onOpenConfirmDeleteMessageModal} = useModal('ConfirmDeleteMessageModal') 
  const handleDelete = ()=>{
    onOpenConfirmDeleteMessageModal({message});
  }

  return (
    <div ref={messageRef} data-loading={isSent===false}   className={styles.message+' '+message_style_classname}>
       
        <div className={styles.message_infos}>
          <span className={styles.sender}>{type=='self' ? 'You' : group.name}</span>
          <span className={styles.time}>{message.created_at}</span>
          
          {/* {
            (type=='self' && isSeen) && <div className={styles.seen}><VscEye/></div>
          } */}
          {
            (type=='self' && !shouldEdit ) && 
            <div className={styles.options}>
              <UnstyledButton onClick={()=>onEdit(message.id)}className={styles.edit_btn}>
                <MdModeEdit />
              </UnstyledButton>
              <UnstyledButton  onClick={handleDelete} className={styles.delete_btn}>
                <BiTrash/>
              </UnstyledButton>
            </div>
          }
        </div>
        
        <div className={styles.body}>
          {attachment &&
            <div className={styles.attachment}>
              <Attachment attachment={attachment}/>          
            </div>
          }

          {shouldEdit ? 
            <form onSubmit={handleUpdate}>
              <input name='text' type="text" defaultValue={text} className={styles.edit_input}/>              
            </form>
            :
            <p>
              {text}
            </p>
          }
        </div>
    </div>

  )
}
