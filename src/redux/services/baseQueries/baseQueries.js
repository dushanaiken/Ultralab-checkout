import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const unAuthBase = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_ULTA_LAB_API_BASE_URL,
});

export const geoLocationAPIBase = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_GEO_LOCATION_API_BASE_URL,
});

export const authBase = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_ULTA_LAB_API_BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        // headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        return headers;
    },
});

export async function getRequest(testId) {

    const response = await fetch(`${process.env.REACT_APP_ULTA_LAB_API_BASE_URL}v1/accounts/${process.env.REACT_APP_ULTA_LAB_ACCOUNT_ID}/items/id/${testId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
    });
    return await response.json();
}
