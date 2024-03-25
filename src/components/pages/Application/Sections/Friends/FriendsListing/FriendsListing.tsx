import { seletctAllFriends, setFriends } from "@/redux/features/Friend/FriendSlice";
import { useDispatch, useSelector } from "react-redux";
import Friend from "./Friend/Friend";



export default function FriendsListing() {
    const dispatch = useDispatch();
    const friends : [Friend?] = useSelector(seletctAllFriends);
 
    
    return (
    <>
    
        {friends.map((friend , key : number)=><Friend key={key} friend={friend}/>)}

    </>
  )
}
