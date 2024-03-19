
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blocked from "./Blocked/Blocked";




export default function BlockedListing() {
    const blockedUsers = useSelector(state=>state.friend.blockedUsers);
    const dispatch = useDispatch();

    console.log({blockedUsers});
    
    return (
    <>
        {blockedUsers.map((blocked , key : number)=><Blocked key={key} blocked={blocked}/>)}
    </>
  )
}
