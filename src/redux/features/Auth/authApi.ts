import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        login : builder.mutation({
            query: (credentials)=>({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
        }),

        refreshToken : builder.mutation({
            query:()=>({
                url:'/refresh-token',
                method:'POST'
            })
        }),

        getUser : builder.query({
            query : ()=>({
                url : '/user'
            }),
            providesTags: ['User'],
        }),

        logout : builder.mutation({
            query : ()=>({
                url : '/logout',
                method:'POST'
            }),
            async onQueryStarted(args , {dispatch , queryFulfilled}){
                try{
                    await queryFulfilled
                    dispatch(baseApi.util.resetApiState());
                }catch(err){
                    console.log(err)
                }
            }
            
        }),

        register : builder.mutation({
            query : (data)=>({
                url : '/register',
                method:'POST',
                body:data
            })
        }),


        forgotPassword : builder.mutation({
            query : (data)=>({
                url : '/forgot-password',
                method:'POST',
                body:data
            })
        }),
        resetPassword : builder.mutation({
            query : (data)=>({
                url : '/reset-password',
                method:'POST',
                body:data
            })
        }),
        sendEmailVerification :builder.mutation({
            query : ()=>({
                url : '/email/verification-notification',
                method:'POST',
            })
        }), 
        updateDisplayName : builder.mutation({
            query:(data)=>({
                url: '/user/displayname/update',
                method: 'POST',
                body:data
            }),
            invalidatesTags:['User']
        }),
        
        updateUsername : builder.mutation({
            query:(data)=>({
                url: '/user/username/update',
                method: 'POST',
                body:data
            }),
            invalidatesTags:['User']
        }),
        updateImage : builder.mutation({
            query:(data)=>({
                url: '/user/image/update',
                method: 'POST',
                body:data,
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }),
            invalidatesTags:['User']
        }),
        updateEmail : builder.mutation({
            query:(data)=>({
                url: '/user/email/update',
                method: 'POST',
                body:data
            }),
            
            invalidatesTags:['User']
        }),
    })
})

export const {
    useRefreshTokenMutation,
    useLoginMutation , 
    useLogoutMutation , 
    useGetUserQuery,
    useLazyGetUserQuery , 
    useRegisterMutation , 
    useForgotPasswordMutation , 
    useResetPasswordMutation , 
    useSendEmailVerificationMutation , 
    
    useUpdateDisplayNameMutation,
    useUpdateUsernameMutation,
    useUpdateImageMutation,
    useUpdateEmailMutation
} 
    = authApi