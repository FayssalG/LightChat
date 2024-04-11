import UnstyledButton from "@/components/shared/UnstyledButton/UnstyledButton";
import styles from './Interlocutor.module.css';
import { useGetFriendsQuery, useUnFriendMutation } from "@/redux/features/friend/friendApi";
import { useAcceptRequestMutation, useCancelRequestMutation, useGetFriendRequestsQuery, useIgnoreRequestMutation, useSendRequestMutation } from "@/redux/features/friendRequest/friendRequestApi";
import { useBlockUserMutation, useGetBlockedUsersQuery, useUnBlockUserMutation } from "@/redux/features/block/blockApi";
import Skeleton from "react-loading-skeleton";

export default function Interlocutor({interlocutor}) {
    
    const [blockUser] = useBlockUserMutation();
    const [unBlockUser ] = useUnBlockUserMutation();
    const [removeFriend ] = useUnFriendMutation();
    
    const [sendFriendRequest ] = useSendRequestMutation(); 
    const [acceptFriendRequest] = useAcceptRequestMutation();
    const [ignoreFriendRequest] = useIgnoreRequestMutation();
    const [cancelFriendRequest ] = useCancelRequestMutation();

    const {blocked} = useGetBlockedUsersQuery(undefined , {
        selectFromResult : ({data})=>({
            blocked : data?.find(b=>b.user_id == interlocutor.user_id)
        })
    })

    const {friend} = useGetFriendsQuery(undefined  , {
        selectFromResult : ({data})=>({
            friend : data?.find(f=>f.user_id == interlocutor.user_id)
        })
    })
    const {friendRequest:sentFriendRequest} = useGetFriendRequestsQuery(undefined , {
        selectFromResult : ({data})=>({
            friendRequest : data?.find(r=>r.receiver_id == interlocutor.user_id)
        })
    })

    const {friendRequest:receivedFriendRequest} = useGetFriendRequestsQuery(undefined , {
        selectFromResult : ({data})=>({
            friendRequest : data?.find(r=>r.sender_id == interlocutor.user_id)
        })
    })

    const handleAddFriend = ()=>{
        sendFriendRequest(interlocutor.username);        
    }

    const handleCancelFriendRequest = ()=>{
        cancelFriendRequest(sentFriendRequest.request_id)
    }

    const handleAcceptFriendRequest = ()=>{
        acceptFriendRequest(receivedFriendRequest.request_id)
    }

    const handleIgnoreFriendRequest = ()=>{
        ignoreFriendRequest(receivedFriendRequest.request_id)
    }

    const handleBlockUser = ()=>{
        blockUser(interlocutor.username)
    }

    const handleUnBlockUser = ()=>{
        unBlockUser(interlocutor.username)
    }

    const handleRemoveFriend = ()=>{
        removeFriend(friend.friendship_id)
    }

    


    const renderButtons = ()=>{
        let result = null
        if(friend){
            result = <UnstyledButton onClick={handleRemoveFriend} className={styles.danger}>Remove Friend</UnstyledButton>                              
        }
        
        if(!friend && sentFriendRequest){
            result = (
                <>
                <UnstyledButton disabled className={styles.disabled}>Friend Request was sent</UnstyledButton>                              
                <UnstyledButton onClick={handleCancelFriendRequest} className={styles.neutral}>Cancel Request</UnstyledButton>                              
                </>
            )
        }
        if(!friend && receivedFriendRequest){
            result = (
            <>
                <UnstyledButton onClick={handleAcceptFriendRequest} className={styles.success}>Accept Request</UnstyledButton>                              
                <UnstyledButton onClick={handleIgnoreFriendRequest} className={styles.neutral}>Ignore Request</UnstyledButton>                              
            </> 
            )
        }
        if(!friend && !blocked && !sentFriendRequest && !receivedFriendRequest){
            result = <UnstyledButton onClick={handleAddFriend} className={styles.success}>Add Friend</UnstyledButton>                              
        }
    
        return(
        <>
            {result}
            {
                !blocked ?
                <UnstyledButton onClick={handleBlockUser} className={styles.neutral}>Block</UnstyledButton>                              
                :
                <UnstyledButton onClick={handleUnBlockUser} className={styles.neutral}>Unblock</UnstyledButton>                              

            }
         </>
        )
        
    }


  return (
    <>
        <div className={styles.picture}>
            <img src={interlocutor.image} alt="" />
        </div>
        <div className={styles.name_username}>
            <h3 className={styles.name}>{interlocutor.display_name}</h3>
            <p className={styles.username}>@{interlocutor.username}</p>
        </div>
        <div className={styles.btns}>

            {
                renderButtons()
            }
            
        
        </div>

    </>
  )
}
