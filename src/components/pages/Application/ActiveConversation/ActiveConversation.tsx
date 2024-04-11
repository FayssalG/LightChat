import styles from './ActiveConversation.module.css';
import avatar from '../../../../assets/avatar.png';
import Topbar from './Topbar/Topbar';
import Message from './Message/Message';
import MessageInput from './MessageInput/MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect} from 'react';
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

export default function ActiveConversation({activeConversation , isFetching}) {
    const dispatch = useDispatch();
    const [markMessagesSeen] = useMarkMessagesSeenMutation();
    
    const interlocutor = activeConversation?.interlocutor

    const {friend} = useGetFriendsQuery(undefined  , {
        selectFromResult : ({data})=>({
            friend : data?.find(f=>f.user_id == interlocutor.user_id)
        })
    })

    const {messages} = useGetMessagesQuery(undefined , {
        selectFromResult : ({data , isFetching})=>({
            isFetching,
            messages: data?.filter(msg=>msg.conversation_id==activeConversation?.conversation_id)
        })
    })    
    const lastMsg = messages[messages.length - 1];


    
    useEffect(()=>{
        console.log('RERENDER USEEFFECT')
        if(activeConversation){
            if(lastMsg && lastMsg?.sender_id == interlocutor?.user_id && lastMsg?.isSeen == false ) {
                markMessagesSeen(activeConversation.conversation_id);
            }
        }
    },[lastMsg])

        
    //Handling hiding activeConversation when the browser back button is pressed
    useEffect(()=>{
        if(activeConversation){
            window.history.pushState(null, document.title, window.location.href);
        }

        const handleCloseOnBackButton = (event) => {
            event.preventDefault();
            dispatch(setActiveConversation(null))
        };

        window.addEventListener('popstate', handleCloseOnBackButton);
    
        return () => window.removeEventListener('popstate', handleCloseOnBackButton);
    
    },[activeConversation])



        
    if(!activeConversation) return <NoActiveConversation/>

    return (
    <div data-visible={activeConversation ? 'true' : 'false'} className={styles.container}>
        
        {
            isFetching ?
            <TopbarLoadingSkeleton/>
            :
            <Topbar person={friend ?? interlocutor} />        
        }
        
        <div className={styles.inner_container}>
            <div className={styles.infos}> 
                <Interlocutor interlocutor={interlocutor}/>
            </div>
            
            {   friend  &&
                <div className={styles.messages}>
                
                    <MessagesListing messages={messages} interlocutor={interlocutor}/>

                </div>
            }
        </div>
        
        {
            friend  ?
                <MessageInput friendId={interlocutor.user_id} conversationId={activeConversation.conversation_id}/>
            :
                <div className={styles.restrict_message}>
                    <p>Conversation restricted, you can't contact <span>{interlocutor.display_name}</span> for now</p>
                </div>
        }

    </div>
    )
}
