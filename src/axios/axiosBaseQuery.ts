import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import Axios from "axios";

const API_BASE_URL: string = /*"https://project-c-backend.vercel.app/_api"*/  "https://192.168.1.13:8000/_api";
const axios = Axios.create({ baseURL: API_BASE_URL } );

export declare namespace API {
    export type BaseResponse = {
      httpStatus: 200;
      created_at: string;
    };
    export type TestResponse = { value: string };
  }
  

export interface AxiosBaseQueryArgs<Meta, Response = API.BaseResponse> {
  meta?: Meta;
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: BaseQueryApi
  ) => AxiosRequestHeaders;
  transformResponse?: (response: Response) => unknown;
}

export interface ServiceExtraOptions {
  authRequired?: boolean;
}

const getRequestConfig = (args: string | AxiosRequestConfig) => {
  if (typeof args === "string") {
    return { url: args };
  }

  return {...args , data:args?.body};
};

const axiosBaseQuery = <
  Args extends AxiosRequestConfig | string = AxiosRequestConfig,
  Result = unknown,
  DefinitionExtraOptions extends ServiceExtraOptions = Record<string, unknown>,
  Meta = Record<string, unknown>
>({
  prepareHeaders,
  meta,
  transformResponse
}: AxiosBaseQueryArgs<Meta> = {}): BaseQueryFn<
  Args,
  Result,
  unknown,
  DefinitionExtraOptions,
  Meta
> => {
  return async (args, api, extraOptions) => {
       console.log({args:getRequestConfig(args),api,extraOptions})

    try {
      const requestConfig = getRequestConfig(args);
      const result = await axios({
        ...requestConfig,
        headers: prepareHeaders
          ? prepareHeaders(requestConfig?.headers || {} , api)
          : requestConfig.headers,
        signal: api.signal,
        ...extraOptions
      });
      
      return {
        data: transformResponse ? transformResponse(result.data) : result.data
      };
    } catch (err) {
      if (!Axios.isAxiosError(err)) {
        return {
          error: err,
          meta
        };
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        },
        meta
      };
    }
  };
};

export default axiosBaseQuery;
