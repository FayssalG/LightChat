import Friend from "./Friend/Friend";
import { useGetFriendsQuery } from "@/redux/features/friend/friendApi";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";



export default function FriendsListing() {
  const {data:friends , isFetching} = useGetFriendsQuery(undefined)
        
  return (
    <>
        {
        isFetching ? <LoadingSkeleton/>
        :
        friends.map((friend , key : number)=><Friend key={key} friend={friend}/>)}

    </>
  )
}
