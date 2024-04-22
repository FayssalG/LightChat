import Blocked from "./Blocked/Blocked";
import { useGetBlockedUsersQuery } from "@/redux/features/block/blockApi";
import LoadingSkeleton from "../../LoadingSkeleton/LoadingSkeleton";




export default function BlockedListing() {
  const {data:blockedUsers , isLoading} = useGetBlockedUsersQuery(undefined);
  
  
    return (
    <>
        {isLoading ?
          <LoadingSkeleton/>
        :
          blockedUsers?.map((blocked , key : number)=><Blocked key={key} blocked={blocked}/>)
        
        }

    </>
  )
}
