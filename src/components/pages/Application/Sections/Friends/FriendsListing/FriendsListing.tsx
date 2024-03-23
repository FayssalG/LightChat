import { get_friends } from "@/axios/friend";
import { setFriends } from "@/redux/features/Friend/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "./Friend/Friend";
import ConfirmRemoveFriendModal from "@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal";



export default function FriendsListing() {
    const dispatch = useDispatch();
    const friends : [Friend?] = useSelector(state=>state.friend.friends);
 
    
    return (
    <>
    
        {friends.map((friend , key : number)=><Friend key={key} friend={friend}/>)}

    </>
  )
}
