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
            query :({group_conversation_id , text, receivers_ids})=>({
                url : '/groups/send-message',
                method:'POST',
                body: {group_conversation_id , text , receivers_ids}
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
        }),

        sendGroupMessageWithAttachment : builder.mutation({
          query :({group_conversation_id , text, receivers_ids , attachment})=>({
              url : '/groups/send-message-attachment',
              method:'POST',
              body: {group_conversation_id , text , receivers_ids , attachment},
              headers : {
                'Content-Type':'multipart/form-data'
              }
            }),
            
            async onQueryStarted(groupMessage , {dispatch , queryFulfilled }){
                const patchedResult = dispatch(
                groupConversationApi.util.updateQueryData('getGroupMessages' , undefined , (draft)=>{              
                  const url = URL.createObjectURL(groupMessage.attachment)
                  const type	= groupMessage.attachment.type
                  const name = groupMessage.attachment.name
                  console.log({...groupMessage , attachment:{url,type,name}})
                  draft.push({...groupMessage , attachment:{url,type,name}})
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
      }),

      deleteGroupMessage : builder.mutation({
        query : (group_message_id)=>({
          url:'/groups/delete-message',
          method:'POST',
          body : {group_message_id}
        }),

        async onQueryStarted(args , {dispatch,queryFulfilled}){
          const patchedResult = dispatch(
            groupConversationApi.util.updateQueryData('getGroupMessages' ,undefined , (draft)=>{
              return draft.filter(msg=>msg.id != args);
            })
          )

          try{
            await queryFulfilled
          }catch(err){
            patchedResult.undo();
          }
        }

      }),

      updateGroupMessage : builder.mutation({
        query : ({group_message_id , text})=>({
          url:'/groups/update-message',
          method: 'POST',
          body: {group_message_id , text}
        }),

        async onQueryStarted(args , {dispatch , queryFulfilled}){
          const patchedResult = dispatch(
            groupConversationApi.util.updateQueryData('getGroupMessages' , undefined , (draft)=>{
              return draft.map((msg)=>{
                if(msg.id == args.group_message_id) return {...msg , text:args.text}
                return msg
              })
            })
          )

          try{
            await queryFulfilled;
          }catch(err){
            console.log({err})
            patchedResult.undo();
          }
        }
      }),

    
    })
})

export const {
    useLazyGetGroupMessagesQuery,
    useGetGroupMessagesQuery,
    useSendGroupMessageMutation,
    useSendGroupMessageWithAttachmentMutation,
    useDeleteGroupMessageMutation,
    useUpdateGroupMessageMutation
} = groupConversationApi