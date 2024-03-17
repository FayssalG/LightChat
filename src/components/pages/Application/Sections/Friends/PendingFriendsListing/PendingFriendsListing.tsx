import { get_friends, get_pending_friends } from "@/axios/friend";
import { setFriends, setPendingFriends } from "@/redux/features/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingFriend from "./PendingFriend/PendingFriend";





export default function PendingFriendsListing() {
    const dispatch = useDispatch();
    const pendingFriends : [Friend?] = useSelector(state=>state.friend.pendingFriends);

    useEffect(()=>{
            get_pending_friends()
            .then((res)=>{
                if(res.status === 200) dispatch(setPendingFriends(res.data));
            })
            .catch( (err)=>{
                console.log(err)
            })
        
      },[])
    
    return (
    <>
        {pendingFriends.map((pendingFriend , key : number)=><PendingFriend key={key} pendingFriend={pendingFriend}/>)}
    </>
  )
}
