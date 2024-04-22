import styles from './GroupMessageInput.module.css';
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useRef, useState } from 'react';
import AttachmentPreview from './AttachmentPreview/AttachmentPreview';
import { useSendMessageMutation, useSendMessageWithAttachmentMutation } from '@/redux/features/Conversation/conversationApi';
import { useGetGroupsQuery } from '@/redux/features/group/groupApi';
import { useSendGroupMessageMutation, useSendGroupMessageWithAttachmentMutation } from '@/redux/features/Conversation/groupConversationApi';
import { group } from 'console';

export default function GroupMessageInput({groupId }) {
  const [sendGroupMessage] = useSendGroupMessageMutation();
  const [sendGroupMessageWithAttachment] = useSendGroupMessageWithAttachmentMutation();

  const user : User = useSelector(state=>state.auth.user);
  const {group} = useGetGroupsQuery(undefined , {
    selectFromResult : ({data})=>({
        group : data?.find(g=>g.id==groupId)
    })
  })

  const [attachment , setAttachment] : [File | null , Function] = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const handleSendMessage= (e : React.FormEvent)=>{
    e.preventDefault();
    let newGroupMessage = {
      id: Math.floor(Math.random()*2000), //set a random id for now  
      group_conversation_id : group.group_conversation.id,
      receivers_ids : group.members.filter(m=>m.id!=user.id).map(m=>m.id),
      sender_id :  user.id ,
      isSent:false,
      text : '',
      attachment : null
    }

    if(attachment){
      newGroupMessage = {...newGroupMessage,
        text:inputRef.current.value,
        attachment : attachment 
      }
      sendGroupMessageWithAttachment(newGroupMessage)
    }
    else if(inputRef.current.value){
      newGroupMessage = {...newGroupMessage,
        text:inputRef.current.value,
      }
      sendGroupMessage(newGroupMessage)
    }
    
    inputRef.current.value = '';
    setAttachment(null)

  }


  const handleChangeAttachment = (e )=>{
    const file : File | undefined = e.target.files[0];
    
    if(file){
      setAttachment(file);
      e.target.value = null
    }
  }

  return (
            
    <form onSubmit={handleSendMessage} className={styles.container}>
            <div className={styles.attachment_preview}>
              <AttachmentPreview attachment={attachment} setAttachment={setAttachment} />
            </div>

            <div className={styles.controls}>              
              <UnstyledButton className={styles.attach_btn}>
                  <CiCirclePlus/>
                  <input onChange={handleChangeAttachment} type="file" />
              </UnstyledButton>

              <input ref={inputRef} type="text" placeholder='Type a message...' />

              <UnstyledButton className={styles.send_btn}>
                  <IoSend/>
              </UnstyledButton>
            </div>

    </form>
    
  )

}
