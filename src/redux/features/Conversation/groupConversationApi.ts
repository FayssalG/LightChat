import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const groupConversationApi = baseApi.injectEndpoints({
    endpoints : builder=>({
        getGroupMessages : builder.query({
            query: ()=>({
                url: '/groups/messages',
            }),
            providesTags:['groupMessages']
        }),
        sendGroupMessage : builder.mutation({
            query :({group_conversation_id , text})=>({
                url : '/groups/send-message',
                method:'POST',
                body: {group_conversation_id , text}
              }),
              
              async onQueryStarted(groupMessage , {dispatch , queryFulfilled }){
                const patchedResult = dispatch(
                  groupConversationApi.util.updateQueryData('getGroupMessages' , undefined , (draft)=>{              
                    draft.push(groupMessage)
                  })
                )
                try{
                  const {data} = await queryFulfilled
      
                  dispatch(
                    groupConversationApi.util.updateQueryData('getGroupMessages' , undefined , (draft)=>{
                      return draft.map(msg => {
                        if(msg.id == groupMessage.id) return data
                        return msg  
                      });
                    })
                  )
                }catch(err){
                  patchedResult.undo()
                }
            }        
        })
    
    })
})

export const {
    useLazyGetGroupMessagesQuery,
    useGetGroupMessagesQuery,
    useSendGroupMessageMutation,
} = groupConversationApi