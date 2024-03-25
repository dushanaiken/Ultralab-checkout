import {createApi} from "@reduxjs/toolkit/query/react";
import { geoLocationAPIBase} from "./baseQueries/baseQueries";

export const geoLocationAPI = createApi({
    reducerPath: 'geoLocationAPI',
    baseQuery: geoLocationAPIBase,
    endpoints: (builder) => ({
        getUserIP: builder.query({
            query: () => ``,
        }),
    })
})
export const {
    useGetUserIPQuery
} = geoLocationAPI;
