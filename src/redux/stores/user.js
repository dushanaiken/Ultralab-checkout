import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        removeToken(state) {
            state.token = null;
        }
    }
});
export const { setToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const getToken = (state) => state.user.token;
