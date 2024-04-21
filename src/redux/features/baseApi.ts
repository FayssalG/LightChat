import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery : axiosBaseQuery({
        transformResponse : response=>response,
        prepareHeaders(headers, {getState}) {
            const token = (getState() as RootState).auth.token;
            if(token){
                headers.Authorization = `Bearer ${token.access_token}`;
            }
            return headers;
        },
    }),
    tagTypes: ['User' ,'Friends' , 'Requests' , 'blocks' ,'Conversations','Messages' , 'groups' , 'groupMessages'],

    endpoints : (builder)=>({
        initCsrf : builder.query({
            query: ()=>({
                url : '/sanctum/csrf-cookie',
                method:'GET'
            })
          }) ,
    
    })
})

export const {
    useLazyInitCsrfQuery
} = baseApi