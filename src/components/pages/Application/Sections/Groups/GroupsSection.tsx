import styles from './GroupsSection.module.css';
import Group from './Group/Group';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import { useDispatch } from 'react-redux';
import { openCreateGroupModal } from '@/redux/features/UiSlice';
import useModal from '@/components/modal/useModal';
import SectionContainer from '../SectionContainer';
import { useGetGroupsQuery } from '@/redux/features/group/groupApi';

export default function GroupsSection() {
  const {data:groups} = useGetGroupsQuery(undefined);
  const {onOpen : onOpenCreateGroupModal} = useModal('CreateGroupModal');

  return (
    <SectionContainer>
        <div className={styles.header}>
            <div className={styles.title}>
                <h1 >Groups</h1>
                <UnstyledButton onClick={()=>onOpenCreateGroupModal({})}>Create a group</UnstyledButton>
            </div>
            <p className={styles.subtext}>Your groups</p>
        </div>

        <div className={styles.groups_list}>
          {
            groups.map((group)=><Group group={group}/>)
          }
        </div>
    </SectionContainer>
  )
}
