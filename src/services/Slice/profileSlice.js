import { createSlice } from "@reduxjs/toolkit"
import { setCookie } from "../../utils/cookie";


const initialState = {isAuth: false,
                      user: {email: "",
                             name: ""  }
                     }

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        register: (state, {payload: {success, user, accessToken, refreshToken}}) => {
            state.isAuth = success;
            state.user = user;
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        },
        authorization: (state, {payload: {success, user, accessToken, refreshToken}}) => {
            state.isAuth = success;
            state.user = user;
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        },
        dataUser:(state, {payload: {success, user}}) => {
            state.isAuth = success;
            state.user = user;
        },
        newAuthorizationToken: (state, {payload: {success, accessToken, refreshToken}}) => {
            state.isAuth = success;
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        },
        exit: (state, {payload: {success, accessToken, refreshToken}}) => {
            state.isAuth = !success;
            state.user = {email: "",
                          name: ""  };
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        }
    }


})

export const authorization = profileSlice.actions.authorization;
export const register = profileSlice.actions.register;
export const dataUser = profileSlice.actions.dataUser;
export const newAuthorizationToken = profileSlice.actions.newAuthorizationToken;
export const exit = profileSlice.actions.exit;

const profile = profileSlice.reducer
export default profile;