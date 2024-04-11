
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blocked from "./Blocked/Blocked";
import FriendSkeleton from "../FriendSkeleton/FriendSkeleton";
import { useGetBlockedUsersQuery } from "@/redux/features/block/blockApi";




export default function BlockedListing() {
  const {data:blockedUsers , isLoading} = useGetBlockedUsersQuery(undefined);
  
  console.log({blockedUsers});
  
    return (
    <>
        {isLoading ?
          <FriendSkeleton/>
        :
          blockedUsers?.map((blocked , key : number)=><Blocked key={key} blocked={blocked}/>)
        
        }

    </>
  )
}
