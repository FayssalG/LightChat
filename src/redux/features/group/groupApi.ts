import { baseApi } from "../baseApi";

export const groupApi = baseApi.injectEndpoints({
    endpoints : builder=>({
        getGroups : builder.query({
            query:()=>({
                url:'/groups'
            }),
            providesTags:['groups']
        }),
        createGroup : builder.mutation({
            query:(data)=>({
                url:'/groups/create',
                method:'POST',
                body:data,
                headers:{
                    'Content-Type':'multipart/form-data'
                },
            }),
            invalidatesTags:['groups']
        }),

        removeMember : builder.mutation({
            query:({group_id,member_id})=>({
                url : '/groups/remove-member',
                method : 'POST',
                body:{group_id,member_id}
            }),
            invalidatesTags : ['groups']
        }),
        
        addMembers : builder.mutation({
            query:({group_id,new_members_ids})=>({
                url : '/groups/add-members',
                method : 'POST',
                body:{group_id,new_members_ids}
            }),
            invalidatesTags : ['groups']
        }) 


    })    
});

export const {
    useGetGroupsQuery,
    useLazyGetGroupsQuery,
    useCreateGroupMutation,
    useRemoveMemberMutation,
    useAddMembersMutation
} = groupApi