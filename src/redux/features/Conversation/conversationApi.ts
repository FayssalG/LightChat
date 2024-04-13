import { baseApi } from "../baseApi";
import { markMessagesSeen, sendMessageWithAttachment } from "./ConversationSlice";

export const conversationApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
      getConversations : builder.query({
        query: ()=>({
          url:'/api/conversations',
        }),
        providesTags:['Conversations']
      }),

      getMessages : builder.query({
        query: ()=>({
          url:'/api/conversations/messages',
        }),
        providesTags:['Messages']

      }),

      sendMessage : builder.mutation({
        query :({receiver_id , text})=>({
          url : '/api/conversations/send-message',
          method:'POST',
          body: {receiver_id , text}
        }),
        
        async onQueryStarted(message , {dispatch , queryFulfilled }){
          const patchedResult = dispatch(
            conversationApi.util.updateQueryData('getMessages' , undefined , (draft)=>{              
              draft.push(message)
            })
          )
          try{
            const {data} = await queryFulfilled

            dispatch(
              conversationApi.util.updateQueryData('getMessages' , undefined , (draft)=>{
                return draft.map(msg => {
                  if(msg.id == message.id) return data
                  return msg  
                });
              })
            )
          }catch(err){
            patchedResult.undo()
          }

        }
      }),
      
      
      sendMessageWithAttachment : builder.mutation({
        query :({receiver_id , text , attachment})=>({
          url : '/api/conversations/send-message-attachment',
          method:'POST',
          headers:{
            'Content-Type':'multipart/form-data'
          },
          body: {receiver_id , text , attachment}
        }),
        
        async onQueryStarted(message , {dispatch , queryFulfilled }){
          const patchedResult = dispatch(
            conversationApi.util.updateQueryData('getMessages' , undefined , (draft)=>{
              const url = URL.createObjectURL(message.attachment)
              const type	= message.attachment.type
              const name = message.attachment.name
    
              draft.push({...message , attachment:{url,type,name}})
            })
          )
          try{
            const {data} = await queryFulfilled
            dispatch(
              conversationApi.util.updateQueryData('getMessages' , undefined , (draft)=>{
                return draft.map(msg => {
                  if(msg.id == message.id) return data
                  return msg  
                });
              })
            )
          }catch(err){
            patchedResult.undo()
          }

        }
      }),

      markMessagesSeen : builder.mutation({
        query: (conversation_id)=>({
          url:'/api/conversations/messages-seen',
          method:'POST',
          body:{conversation_id}
        }),
        async onQueryStarted(args , {dispatch , queryFulfilled}){
            const patchedResult = dispatch(
              conversationApi.util.updateQueryData('getMessages' , undefined , (draft)=>{
                return draft.map((msg)=>({...msg,isSeen:true}))
              })
            )
            try{
              await queryFulfilled
            }catch(err) {
              patchedResult.undo();
            }
        },
        // invalidatesTags:['Messages']
      }),
      
      updateMessage : builder.mutation({
        query : ({message_id , text})=>({
          url:'/api/conversations/update-message',
          method: 'POST',
          body: {message_id , text}
        }),

        async onQueryStarted(args , {dispatch , queryFulfilled}){
          const patchedResult = dispatch(
            conversationApi.util.updateQueryData('getMessages' , undefined , (draft)=>{
              return draft.map((msg)=>{
                if(msg.id == args.message_id) return {...msg , text:args.text}
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

      deleteMessage : builder.mutation({
        query : (message_id)=>({
          url:'/api/conversations/delete-message',
          method:'POST',
          body : {message_id}
        }),

        async onQueryStarted(args , {dispatch,queryFulfilled}){
          const patchedResult = dispatch(
            conversationApi.util.updateQueryData('getMessages' ,undefined , (draft)=>{
              return draft.filter(msg=>msg.id != args);
            } )
          )
          try{
            await queryFulfilled
          }catch(err){
            patchedResult.undo();
          }
        }

      })

      


    })




})

export const {
  useDeleteMessageMutation,
  useUpdateMessageMutation,
  useMarkMessagesSeenMutation,
  useSendMessageWithAttachmentMutation,
  useSendMessageMutation,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,

  useLazyGetConversationsQuery,
  useGetConversationsQuery,
} = conversationApi