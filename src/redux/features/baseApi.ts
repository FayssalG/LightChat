import axiosBaseQuery from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery : axiosBaseQuery({baseUrl:'https://192.168.1.13:8000'}),
    tagTypes: ['User' ,'Friends' , 'Requests' , 'blocks' ,'Conversations','Messages'],

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