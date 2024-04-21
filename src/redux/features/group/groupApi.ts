import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
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
        
        addMember : builder.mutation({
            query:({group_id,member_id})=>({
                url : '/groups/add-member',
                method : 'POST',
                body:{group_id,member_id}
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
    useAddMemberMutation
} = groupApi