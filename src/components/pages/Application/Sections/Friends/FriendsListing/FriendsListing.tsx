import { selectAccessibleFriends, seletctAllFriends, setFriends } from "@/redux/features/Friend/FriendSlice";
import { useDispatch, useSelector } from "react-redux";
import Friend from "./Friend/Friend";
import FriendSkeleton from "../FriendSkeleton/FriendSkeleton";



export default function FriendsListing() {
  const friendStatus = useSelector(state=>state.friend.status);
  const isLoading = friendStatus == 'loading';
  
  const dispatch = useDispatch();
  const friends : [Friend?] = useSelector(selectAccessibleFriends);
  
    
    return (
    <>

        {
        isLoading ? <FriendSkeleton/>
        :
        friends.map((friend , key : number)=><Friend key={key} friend={friend}/>)}

    </>
  )
}
