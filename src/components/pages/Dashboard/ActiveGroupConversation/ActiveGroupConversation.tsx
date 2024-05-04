import styles from './ActiveGroupConversation.module.css';
import avatar from '../../../../assets/avatar.png';
import Topbar from './Topbar/Topbar';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState} from 'react';
import { selectFriendById  } from '@/redux/features/friend/FriendSlice';

import { hideConversationOnMobile } from '@/redux/features/UiSlice';
import { useGetConversationsQuery, useGetMessagesQuery, useMarkMessagesSeenMutation } from '@/redux/features/Conversation/conversationApi';
import NoActiveConversation from '../NoActiveConverastion/NoActiveConversation';
import { setActiveConversation } from '@/redux/features/Conversation/ConversationSlice';
import {  useGetGroupsQuery } from '@/redux/features/group/groupApi';
import GroupTopbar from './GroupTopbar/GroupTopbar';
import GroupMessagesListing from './GroupMessageListing/GroupMessageListing';
import GroupMessageInput from './GroupMessageInput/GroupMessageInput';
import { useGetGroupMessagesQuery } from '@/redux/features/Conversation/groupConversationApi';
import { Navigate, useParams } from 'react-router-dom';
import TopbarLoadingSkeleton from '../ActiveConversation/Topbar/TopbarLoadingSkeleton/TopbarLoadingSkeleton';
import FriendDetails from '../Details/FriendDetails/FriendDetails';
import GroupDetails from '../Details/GroupDetails/GroupDetails';

export default function ActiveGroupConversation() {
    const {convId} = useParams();
    const [showDetails , setShowDetails] = useState(false);
    const {activeConversation , isFetching} = useGetGroupsQuery(undefined , {
        selectFromResult : ({data,isFetching})=>({
          isFetching,
          activeConversation : data?.map(g=>g.group_conversation).find(gc=>gc.id==convId)
        })
      });
    
    const {group} = useGetGroupsQuery(undefined , {
        selectFromResult: ({data})=>({
            group : data?.find(g=>g.id==activeConversation?.group_id)
        })
    })

    const {groupMessages} = useGetGroupMessagesQuery(undefined , {
        selectFromResult : ({data , isFetching})=>({
            isFetching,
            groupMessages: data?.filter(gmsg=>gmsg.group_conversation_id==activeConversation?.id)
        })
    })    
    console.log({groupMessages})

    // const lastMsg = groupMessages[groupMessages.length - 1];    
    // useEffect(()=>{
    //     if(activeGroupConversation){
    //         if(lastMsg && lastMsg?.sender_id !== user?.id && lastMsg?.isSeen == false ) {
    //             markMessagesSeen(activeConversation.conversation_id);
    //         }
    //     }
    // },[lastMsg])

        
    if(!activeConversation) return <Navigate to='/'/>

    return (
        <div className={styles.container}>
            
            <div data-visible={activeConversation ? 'true' : 'false'} className={styles.inner_container}>
                
                {
                    isFetching ?
                    <TopbarLoadingSkeleton/> 
                    :
                    <GroupTopbar onOpenDetails={()=>setShowDetails(true)} group={group} />        
                }
                
                <div className={styles.body}>
                    {   group  &&
                        <div className={styles.messages}>
                            <GroupMessagesListing groupMessages={groupMessages} group={group}/>
                        </div>
                    }
                </div>
                
                {
                    group ?
                        <GroupMessageInput groupId={group.id} />
                    :
                        <div className={styles.restrict_message}>
                            <p>Conversation restricted, you can't contact <span>{group.name}</span> for now</p>
                        </div>
                }

            </div>

            { (group && showDetails) &&
            <div className={styles.details}>
                <GroupDetails group={group} onClose={()=>setShowDetails(false)}/>
            </div>
            }
    </div>
    )
}
