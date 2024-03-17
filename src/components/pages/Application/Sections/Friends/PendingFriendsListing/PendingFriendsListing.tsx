import { get_friend_requests } from "@/axios/friend";
import { setFriends, setPendingFriends } from "@/redux/features/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingFriend from "./PendingFriend/PendingFriend";





export default function PendingFriendsListing() {
    const dispatch = useDispatch();
    const pendingFriends : [Friend?] = useSelector(state=>state.friend.pendingFriends);

    
    return (
    <>
        {pendingFriends.map((pendingFriend , key : number)=><PendingFriend key={key} pendingFriend={pendingFriend}/>)}
    </>
  )
}
