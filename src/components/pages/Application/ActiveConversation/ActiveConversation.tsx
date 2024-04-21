import styles from './ActiveConversation.module.css';
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
import TopbarLoadingSkeleton from './Topbar/TopbarLoadingSkeleton/TopbarLoadingSkeleton';
import MessagesListing from './MessagesListing/MessagesListing';
import UnstyledButton from '@/components/shared/UnstyledButton/UnstyledButton';
import { useBlockUserMutation, useGetBlockedUsersQuery, useUnBlockUserMutation } from '@/redux/features/block/blockApi';
import { useGetFriendsQuery, useUnFriendMutation } from '@/redux/features/friend/friendApi';
import { useGetFriendRequestsQuery, useSendRequestMutation } from '@/redux/features/friendRequest/friendRequestApi';
import Interlocutor from './Interlocutor/Interlocutor';
import { setActiveConversation } from '@/redux/features/Conversation/ConversationSlice';
import { Navigate, useParams } from 'react-router-dom';
import GroupDetails from '../Details/GroupDetails/GroupDetails';
import FriendDetails from '../Details/FriendDetails/FriendDetails';

export default function ActiveConversation() {
    const {convId} = useParams();
    const [showDetails , setShowDetails] = useState(false) 
 
    const {activeConversation , isFetching} = useGetConversationsQuery(undefined , {
        selectFromResult : ({data,isFetching})=>({
          isFetching,
          activeConversation : data?.find(c=>c.conversation_id==convId)
        })
      });
    
    const person = activeConversation?.person
    const {friend} = useGetFriendsQuery(undefined  , {
        selectFromResult : ({data})=>({
            friend : data?.find(f=>f?.user_id == person?.user_id)
        })
    })

    const [markMessagesSeen] = useMarkMessagesSeenMutation();
    
    
    const {messages} = useGetMessagesQuery(undefined , {
        selectFromResult : ({data , isFetching})=>({
            isFetching,
            messages: data?.filter(msg=>msg.conversation_id==convId)
        })
    })    

    const lastMsg = messages[messages.length - 1];


    
    useEffect(()=>{
        if(activeConversation){
            if(lastMsg && lastMsg?.sender_id == person?.user_id && lastMsg?.isSeen == false ) {
                markMessagesSeen(activeConversation.conversation_id);
            }
        }
    },[lastMsg])

        
    //Handling hiding activeConversation when the browser back button is pressed
    // useEffect(()=>{
    //     if(activeConversation){
    //         window.history.pushState(null, document.title, window.location.href);
    //     }

    //     const handleCloseOnBackButton = (event) => {
    //         event.preventDefault();
    //         dispatch(setActiveConversation(null))
    //     };

    //     window.addEventListener('popstate', handleCloseOnBackButton);
    
    //     return () => window.removeEventListener('popstate', handleCloseOnBackButton);
    
    // },[activeConversation])



        
    if(!activeConversation) return <Navigate to={'/'}/>

    return (
    <div className={styles.container}>
        <div data-visible={activeConversation ? 'true' : 'false'} className={styles.inner_container}>
            
            {
                isFetching ?
                <TopbarLoadingSkeleton/>
                :
                <Topbar onOpenDetails={()=>setShowDetails(true)} person={friend ?? person} />        
            }
            
            <div className={styles.body}>
                <div className={styles.infos}> 
                    <Interlocutor interlocutor={person}/>
                </div>
                
                {   friend  &&
                    <div className={styles.messages}>
                    
                        <MessagesListing messages={messages} interlocutor={person}/>

                    </div>
                }
            </div>
            
            {
                friend  ?
                    <MessageInput friendId={person.user_id} conversationId={activeConversation.conversation_id}/>
                :
                    <div className={styles.restrict_message}>
                        <p>Conversation restricted, you can't contact <span>{person.display_name}</span> for now</p>
                    </div>
            }

        </div>

        {(friend && showDetails) &&        
            <div className={styles.details}>
                <FriendDetails onClose={()=>setShowDetails(false)} friend={friend }/>
            </div>   
        }        
    </div>
    )
}
