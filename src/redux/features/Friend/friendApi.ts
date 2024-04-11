import { baseApi } from "../baseApi";

export const friendApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({

      getFriends : builder.query({
        query : ()=>({
            url : '/api/friends/accepted',
            method:'GET',
        }),        

        // transformResponse : (response)=>{
        //     console.log({response})
        //     const friends = response.map((friend)=>{
        //         return {...friend , isStillFriend:true , isBlocked:false}
        //     })
        //     return friends
        // },

        providesTags: ['Friends']
      }),

      unFriend : builder.mutation({
        query: (friendship_id)=>({
            url:'/api/friends/remove',
            method:'POST',
            body:{friendship_id}
        }),        
        async onQueryStarted(args , {dispatch , queryFulfilled}){
          const patchedResult = dispatch(
            friendApi.util.updateQueryData('getFriends' , undefined , (draft)=>{
              return draft.filter(f=>f.friendship_id != args)
            })
          )

          try{
            await queryFulfilled
          }catch(err) {
            patchedResult.undo();
          }
        },
        invalidatesTags : ['Friends']
      }),

      
    })


})

export const {
    useGetFriendsQuery,
    useLazyGetFriendsQuery,
    useUnFriendMutation,
} = friendApi