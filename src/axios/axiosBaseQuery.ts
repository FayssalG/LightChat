import axios from "axios";


const axiosInstance = axios.create({
    baseURL : 'https://192.168.1.13:8000',
    headers : {
        'Content-Type' : 'application/json',
        Accept  : 'application/json'
    },
    withCredentials : true,
    withXSRFToken:true,
});


const axiosBaseQuery  = ({baseUrl} = {baseUrl:''})=>{
    return async ({url , method , body , params , headers})=>{
            try{
                const result = await axiosInstance({
                    url: baseUrl + url,
                    method,
                    data:body,
                    params,
                    headers
                })

                return {data: result.data}

            }catch(axiosError){
                const err = axiosError
                return {
                    error:{
                        status:err.response?.status,
                        data : err.response.data || err.message
                    }
                }
            }
        }
}

export default axiosBaseQuery
