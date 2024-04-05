
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blocked from "./Blocked/Blocked";
import FriendSkeleton from "../FriendSkeleton/FriendSkeleton";




export default function BlockedListing() {
  const status = useSelector(state=>state.block.status);
  const isLoading = status == 'loading';

  const blockedUsers = useSelector(state=>state.block.blockedUsers);
  const dispatch = useDispatch();
  
  console.log({blockedUsers});
  
    return (
    <>
        {isLoading ?
          <FriendSkeleton/>
        :
          blockedUsers.map((blocked , key : number)=><Blocked key={key} blocked={blocked}/>)
        
        }

    </>
  )
}
