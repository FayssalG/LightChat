import styles from './FriendsSection.module.css';
import Friend from './Friend/Friend';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { openAddFriendModal } from '@/redux/features/UiSlice';
import { useEffect } from 'react';
import { get_all_friends } from '@/axios/friend';
import { setFriends } from '@/redux/features/FriendSlice';

export default function FriendsSection() {
  const dispatch = useDispatch();
  const friends = useSelector(state=>state.friend.friends);

  useEffect(()=>{
    get_all_friends()
    .then((res)=>{
      dispatch(setFriends(res.data));
    })
    .catch((err)=>{
      console.log(err)
    })

  },[])

  
  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title_addbtn}>
            <h1 >Friends</h1>
            <UnstyledButton onClick={()=>dispatch(openAddFriendModal())}>Add Friend</UnstyledButton>
          </div>

          <div className={styles.search}>
            <input type="text" placeholder='Search...'/>
          </div>

          <div className={styles.filters}>
            <button>All</button>
            <button>Blocked</button>
            <button>Pending</button>
          </div>  
        </div>


        <div className={styles.friends_list}>
          {friends.map((friend , key)=><Friend key={key} friend={friend}/>)}
        </div>
    </div>
  )
}
