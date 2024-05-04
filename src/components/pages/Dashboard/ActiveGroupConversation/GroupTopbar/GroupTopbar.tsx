import styles from './GroupTopbar.module.css';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface IGroupTopbarProps  {
  onOpenDetails  : Function,
  group : Group
}

export default function GroupTopbar({onOpenDetails,group} : IGroupTopbarProps) {

  const navigate = useNavigate();

  const handleClose=()=>{
    navigate('/')
  }

  
  return (
    <div className={styles.topbar}>
        <div className={styles.picture}>
            <img src={group.image.url} alt="Avatar" />
        </div>
        
        <UnstyledButton onClick={onOpenDetails} className={styles.name_status}>
            <h2 className={styles.name} >{group?.name}</h2>
        </UnstyledButton>

        
        <UnstyledButton onClick={handleClose} className={styles.close}>
          <IoClose/>
        </UnstyledButton>
    </div>

  )
}
