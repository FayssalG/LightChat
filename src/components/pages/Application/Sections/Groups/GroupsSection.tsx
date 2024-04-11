import styles from './GroupsSection.module.css';
import Group from './Group/Group';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { useDispatch } from 'react-redux';
import { openCreateGroupModal } from '@/redux/features/UiSlice';
import useModal from '@/components/modal/useModal';
import SectionContainer from '../SectionContainer';

export default function GroupsSection() {
  const dispatch = useDispatch();
  
  const {onOpen : onOpenCreateGroupModal} = useModal('CreateGroupModal');

  return (
    <SectionContainer>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1 >Groups</h1>
                <UnstyledButton onClick={onOpenCreateGroupModal}>Create a group</UnstyledButton>
            </div>
            <p className={styles.subtext}>Your groups</p>
        </div>

        <div className={styles.groups_list}>
            <Group/>
        </div>
    </SectionContainer>
  )
}
