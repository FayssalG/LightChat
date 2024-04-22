import { useSelector } from 'react-redux';
import styles from './GroupMessage.module.css';
import { VscEye } from 'react-icons/vsc';
import Attachment from './Attachment/Attachment';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import {  BiTrash } from 'react-icons/bi';
import { MdModeEdit } from 'react-icons/md';
import { useDeleteMessageMutation, useUpdateMessageMutation } from '@/redux/features/Conversation/conversationApi';
import useModal from '@/components/modal/useModal';
import { useUpdateGroupMessageMutation } from '@/redux/features/Conversation/groupConversationApi';
// import { selectMessageById } from '@/redux/features/FriendConversation/FriendConversationSlice';


export default function GroupMessage({messageRef,onEdit , shouldEdit ,   message , group} : any) {
  const [updateGroupMessage] = useUpdateGroupMessageMutation();
  const user = useSelector(state=>state.auth.user);  
  const {text , attachment , isSent } = message;

  const type = message?.sender_id == user.id ? 'self' : null;
  let message_style_classname = type == 'self' ? styles.message_self : styles.message_other  
  
  const handleUpdate = (e)=>{
      e.preventDefault()
      const formData = new FormData(e.target)
      updateGroupMessage({group_message_id:message.id , text:formData.get('text')})
      onEdit(null)
  }

  const {onOpen:onOpenConfirmDeleteGroupMessageModal} = useModal('ConfirmDeleteGroupMessageModal') 
  const handleDelete = ()=>{
    onOpenConfirmDeleteGroupMessageModal({message});
  }

  const sender = group.members.find(m=>m.id==message.sender_id);

  return (

    <div className={styles.container}>
      {
        type!='self' &&
        <div className={styles.sender_image}>
          <img src={sender?.image?.url} alt="" />
        </div>
      }

      <div ref={messageRef} data-loading={isSent===false}   className={styles.message+' '+message_style_classname}>
          
          
          <div className={styles.message_infos}>

            <span className={styles.sender}>{type=='self' ? 'You' : sender?.username}</span>
            <span className={styles.time}>{message.created_at}</span>
            
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
    </div>

  )
}
