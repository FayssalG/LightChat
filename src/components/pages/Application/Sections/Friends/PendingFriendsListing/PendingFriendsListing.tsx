import { useGetFriendRequestsQuery } from "@/redux/features/friendRequest/friendRequestApi";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";
import PendingFriend from "./PendingFriend/PendingFriend";





export default function PendingFriendsListing() {
  const {data:friendRequests , isLoading} = useGetFriendRequestsQuery(undefined);
      
    return (
    <>
        {isLoading ?
            <LoadingSkeleton/>
          :
          friendRequests.map((request , key : number)=><PendingFriend key={key} pendingFriend={request}/>)
        }
    </>
  )
}
