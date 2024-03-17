import { get_friends } from "@/axios/friend";
import { setFriends } from "@/redux/features/FriendSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "./Friend/Friend";



export default function FriendsListing() {
    const dispatch = useDispatch();
    const friends : [Friend?] = useSelector(state=>state.friend.friends);

    useEffect(()=>{
            get_friends()
            .then((res)=>{
                if (res.status === 200) dispatch(setFriends(res.data));

            })
            .catch( (err)=>{
                console.log(err)
            })
        
      },[])
    
    return (
    <>
        {friends.map((friend , key : number)=><Friend key={key} friend={friend}/>)}
    </>
  )
}
