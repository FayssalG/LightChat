import { baseApi } from "../baseApi";

export const friendRequestApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
      getFriendRequests : builder.query({
        query : ()=>({
            url : '/friends/requests',
            method:'GET',
        }),        
        providesTags: ['Requests']
      }),

      sendRequest : builder.mutation({
        query : (username)=>({
            url : '/friends/send-request',
            method:'POST',
            body : {username}
        }),        
        invalidatesTags: ['Requests']
      }),

      acceptRequest : builder.mutation({
        query : (request_id)=>({
            url : '/friends/accept-request',
            method:'POST',
            body : {request_id}
        }),
        async onQueryStarted(args , {dispatch , queryFulfilled }){

          const patchResult = dispatch(
              friendRequestApi.util.updateQueryData('getFriendRequests' , undefined , (draft)=>{
                const filterd = draft.filter((r) => r.request_id != args) 
                return filterd
              })
          )
            

          try{
              await queryFulfilled
          }catch(err){
              patchResult.undo();
          }

        },
        
        invalidatesTags: ['Friends' , 'Conversations']
      }),

      cancelRequest : builder.mutation({
        query : (request_id)=>({
            url : '/friends/cancel-request',
            method:'POST',
            body : {request_id}
        }),

        async onQueryStarted(args , {dispatch , queryFulfilled }){

          const patchResult = dispatch(
              friendRequestApi.util.updateQueryData('getFriendRequests' , undefined , (draft)=>{
                const filterd = draft.filter((r) => r.request_id != args) 
                return filterd
              })
          )
            

          try{
              await queryFulfilled
          }catch(err){
              patchResult.undo();
          }

        },
        
        
      }),


      ignoreRequest : builder.mutation({
        query : (request_id)=>({
            url : '/friends/ignore-request',
            method:'POST',
            body : {request_id}
        }),        

        async onQueryStarted(args , {dispatch , queryFulfilled}){
          const patchedResult = dispatch(
            friendRequestApi.util.updateQueryData('getFriendRequests' , undefined , (draft)=>{
              return draft.filter((r)=>r.request_id != args)
            })
          )

          try{
            await queryFulfilled
          }catch(err){
            patchedResult.undo();
          }
        }
      }),

      
    })


})

export const {
    useIgnoreRequestMutation,
    useCancelRequestMutation,
    useAcceptRequestMutation,
    useSendRequestMutation,
    useGetFriendRequestsQuery,
    useLazyGetFriendRequestsQuery,
} = friendRequestApi