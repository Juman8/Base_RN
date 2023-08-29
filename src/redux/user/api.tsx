import {listData, SignUpVerifyCodeResponse, SignUpRequest} from '@models';
import {baseApi} from '../api';

const signUpUrl = 'auth/signup';
const getWebsite = 'movies.json';
export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<SignUpVerifyCodeResponse, SignUpRequest>({
      query: body => ({
        url: signUpUrl,
        method: 'POST',
        body,
      }),
    }),
    getListData: builder.query<listData, void>({
      query: () => ({
        url: getWebsite,
        method: 'get',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useSignUpMutation, useGetListDataQuery} = authApi;
