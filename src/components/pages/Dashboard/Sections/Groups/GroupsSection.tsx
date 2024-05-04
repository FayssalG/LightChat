import styles from './GroupsSection.module.css';
import Group from './Group/Group';
import UnstyledButton from '../../../../shared/UnstyledButton/UnstyledButton';
import useModal from '@/components/modal/useModal';
import SectionContainer from '../SectionContainer';
import { useGetGroupsQuery } from '@/redux/features/group/groupApi';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';

export default function GroupsSection() {
  const {data:groups , isFetching} = useGetGroupsQuery(undefined);
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
            isFetching ?
            <LoadingSkeleton/>
            :
            groups.map((group : Group)=><Group group={group}/>)
          }
        </div>
    </SectionContainer>
  )
}
