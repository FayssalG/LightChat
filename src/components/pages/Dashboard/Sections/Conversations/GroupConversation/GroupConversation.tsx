import styles from './GroupConversation.module.css';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';

import { useGetGroupsQuery } from '@/redux/features/group/groupApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface IGroupConversationProps {
  groupConversation : GroupConverastion
}

export default function GroupConversation({groupConversation} : IGroupConversationProps) {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {convId} = useParams() 
  
  const isSelected = (pathname?.match(/\/group\/*/g) && convId == groupConversation.id) 

  const {group} = useGetGroupsQuery(undefined , {
    selectFromResult : ({data})=>({
      group : data?.find(g=>g.id === groupConversation.group_id)
    })
  })

  const handleSelectConversation = ()=>{
    navigate('/group/'+groupConversation.id);
  }

  

  return (
    <UnstyledButton  onClick={handleSelectConversation} data-selected={isSelected} className={styles.conversation}>
        <div className={styles.picture}>
            <img src={group.image.url} alt="avatar" />
        </div>

        <div className={styles.name}>
            <h2 className={styles.display_name}>{group.name}</h2>
        </div>

        <div data-visible={[]?.length != 0} className={styles.notread_marker}> 
            {[]?.length}
        </div>

    </UnstyledButton>

  )
}
