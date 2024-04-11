import Friend from "./Friend/Friend";
import FriendSkeleton from "../FriendSkeleton/FriendSkeleton";
import { useGetFriendsQuery } from "@/redux/features/friend/friendApi";



export default function FriendsListing() {
  const {data:friends , isFetching} = useGetFriendsQuery(undefined)
    
  console.log({FRIENDS:friends})
    
  return (
    <>
        {
        isFetching ? <FriendSkeleton/>
        :
        friends.map((friend , key : number)=><Friend key={key} friend={friend}/>)}

    </>
  )
}
