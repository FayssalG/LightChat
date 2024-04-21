import { friendApi } from "../friend/friendApi";
import { baseApi } from "../baseApi";

export const blockApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        getBlockedUsers : builder.query<BlockedUser[] , undefined>({
            query : ()=>({
                url:'/friends/blocked',   
            }),
            providesTags:['blocks' ]
        }),

        blockUser : builder.mutation({
            query:(username)=>({
                url:'/friends/block',
                method: 'POST',
                body:{username}
            }),

            invalidatesTags: ['blocks' ],

            async onQueryStarted(args , {dispatch , queryFulfilled}){
                const patchedResult = dispatch(
                    friendApi.util.updateQueryData('getFriends' , undefined , (draft)=>{
                        return draft.filter(f=>f.username != args);
                    })
                )

                try{
                    await queryFulfilled;
                }catch(err){
                    patchedResult.undo();
                }
            }
        }),

        unBlockUser : builder.mutation({
            query:(username)=>({
                url:'/friends/unblock',
                method: 'POST',
                body:{username}
            }),

            invalidatesTags: ['blocks' ],

            async onQueryStarted(args , {dispatch , queryFulfilled}){
                const patchedResult = dispatch(
                    blockApi.util.updateQueryData('getBlockedUsers' , undefined , (draft)=>{
                        return draft.filter(b=>b.username != args);
                    })
                )

                try{
                    await queryFulfilled;
                }catch(err){
                    patchedResult.undo();
                }
            }
        }),
        
    })


})

export const {
    useUnBlockUserMutation,
    useLazyGetBlockedUsersQuery,
    useGetBlockedUsersQuery,
    useBlockUserMutation,
} = blockApi