import {configureStore } from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";
import {userReducer} from "./user";
import {ultaLabAPI} from "../services/UltaLab";
import {geoLocationAPI} from "../services/GeoLocation";


export const store = configureStore({
    reducer: {
        user: userReducer,
        [ultaLabAPI.reducerPath]: ultaLabAPI.reducer,
        [geoLocationAPI.reducerPath]: geoLocationAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ultaLabAPI.middleware).concat(geoLocationAPI.middleware)
})


setupListeners(store.dispatch)


