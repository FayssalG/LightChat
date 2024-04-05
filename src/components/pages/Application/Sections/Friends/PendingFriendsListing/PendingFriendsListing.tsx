import { get_friend_requests } from "@/axios/friend";
import { setFriends, setPendingFriends } from "@/redux/features/Friend/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingFriend from "./PendingFriend/PendingFriend";
import FriendSkeleton from "../FriendSkeleton/FriendSkeleton";





export default function PendingFriendsListing() {
  const status = useSelector(state=>state.friendRequest.status);
  const isLoading = status == 'loading';

  const friendRequests : [Friend?] = useSelector(state=>state.friendRequest.requests);
    
    console.log({friendRequests})
  

    return (
    <>
        {isLoading ?
            <FriendSkeleton/>
          :
          friendRequests.map((request , key : number)=><PendingFriend key={key} pendingFriend={request}/>)
        }
    </>
  )
}
