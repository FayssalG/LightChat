import { get_friend_requests } from "@/axios/friend";
import { setFriends, setPendingFriends } from "@/redux/features/Friend/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingFriend from "./PendingFriend/PendingFriend";





export default function PendingFriendsListing() {
    const friendRequests : [Friend?] = useSelector(state=>state.friendRequest.requests);
    
    console.log({friendRequests})
  

    return (
    <>
        {friendRequests.map((request , key : number)=><PendingFriend key={key} pendingFriend={request}/>)}
    </>
  )
}
