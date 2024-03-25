import {createApi} from "@reduxjs/toolkit/query/react";
import {setToken} from "../stores/user";
import {authBase, getRequest, unAuthBase} from "./baseQueries/baseQueries";

export const ultaLabAPI = createApi({
    reducerPath: 'ultaLabAPI',
    baseQuery: authBase,
    endpoints: (builder) => ({
        merchantLogin: builder.mutation({
            query: (formBody) => ({
                url: 'token',
                method: 'POST',
                body: formBody,
            }),
        }),
        getPCSByZipAndRadius: builder.query({
            query: ({
                        zipCode,
                        radius
                    }) => `v1/accounts/${process.env.REACT_APP_ULTA_LAB_ACCOUNT_ID}/locations/search/${zipCode}/${radius}`,
        }),
        getTestList: builder.query({
            queryFn: (ids) => {
                const promises = ids.map((id) => {
                    return getRequest(id);
                });
                return Promise.all(promises).then((results) => {
                    return {data: results};
                });
            },
        }),
        createOrderAndRetrieveToken: builder.mutation({
            query: (formBody) => ({
                url: 'v1/orders/createandgetformtoken',
                method: 'POST',
                body: formBody,
            }),
        }),
    }),
})


export const {
    useLazyGetPCSByZipAndRadiusQuery,
    useMerchantLoginMutation,
    useCreateOrderAndRetrieveTokenMutation,
    useLazyGetTestListQuery
} = ultaLabAPI

