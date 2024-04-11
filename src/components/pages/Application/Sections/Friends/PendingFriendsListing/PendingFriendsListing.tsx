import { get_friend_requests } from "@/axios/friend";
import { setFriends, setPendingFriends } from "@/redux/features/friend/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PendingFriend from "./PendingFriend/PendingFriend";
import FriendSkeleton from "../FriendSkeleton/FriendSkeleton";
import { useGetFriendRequestsQuery } from "@/redux/features/friendRequest/friendRequestApi";





export default function PendingFriendsListing() {
  const {data:friendRequests , isLoading} = useGetFriendRequestsQuery();


  // const friendRequests : [Friend?] = useSelector(state=>state.friendRequest.requests);
    
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
