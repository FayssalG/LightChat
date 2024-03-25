import { get_friends } from "@/axios/friend";
import { setFriends } from "@/redux/features/Friend/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "./Friend/Friend";
import ConfirmRemoveFriendModal from "@/components/modals/ConfirmRemoveFriendModal/ConfirmRemoveFriendModal";
import { seletctAllFriends } from "@/redux/features/FriendConversation/FriendConversationSlice";



export default function FriendsListing() {
    const dispatch = useDispatch();
    const friends : [Friend?] = useSelector(seletctAllFriends);
 
    
    return (
    <>
    
        {friends.map((friend , key : number)=><Friend key={key} friend={friend}/>)}

    </>
  )
}
