import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookie";
import { requestAuth, requestPost } from "../../utils/API";
import { AppDispatch, ProfilePayloadTypes, ProfileType, createAsyncThunk } from "../../utils/prop-types";



const initialState: ProfileType = {isAuth: false,
                                   user: {email: "",
                                          name: ""  }
                                  }

export const updateDataProfile = createAsyncThunk(
  'profile/updateDataProfile',
  (dispatch: AppDispatch) => {
        const token = getCookie('accessToken'); //Получаем токен авторизации из куки

        if (token){//Если токен есть, то запрашиваем данные, которые отображаем в <Input/>
            requestAuth('auth/user', "GET", token)
            .then(res => dispatch(dataUser(res)))
            .catch(err => dispatch(errorRequest(err)))
        }
        else{//Если токена нет, то запрашиваем новый
            requestPost([{token: getCookie('refreshToken')}, 'auth/token'])
            .then(res => dispatch(newAuthorizationToken(res)))
            .catch(err => dispatch(errorRequest(err)))
        }
  }
)

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        register: (state, {payload: {success, user, accessToken, refreshToken}}: ProfilePayloadTypes) => {
            state.isAuth = success;
            state.user = user;
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        },
        authorization: (state, {payload: {success, user, accessToken, refreshToken}}: ProfilePayloadTypes) => {
            state.isAuth = success;
            state.user = user;
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        },
        dataUser:(state, {payload: {success, user}}) => {
            state.isAuth = success;
            state.user = user;
        },
        newAuthorizationToken: (state, {payload: {success, accessToken, refreshToken}}: ProfilePayloadTypes) => {
            state.isAuth = success;
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        },
        exit: (state, {payload: {success, accessToken, refreshToken}}: ProfilePayloadTypes) => {
            state.isAuth = !success;
            state.user = {email: "",
                          name: ""  };
            setCookie('accessToken', accessToken, {'max-age': 1000});
            setCookie('refreshToken', refreshToken)
        },
        errorRequest: (state, action) =>{
            state.isAuth = false;
            state.user.email = "Ошибка загрузки";
            state.user.name = "Ошибка загрузки";
            console.log(action.payload)
        }
    },
    extraReducers: (build) => {
        build.addCase(updateDataProfile.pending, ()  =>  console.log("Ждём данные профиля с сервера"))
        build.addCase(updateDataProfile.fulfilled, () => console.log("Данные получены")) 
        build.addCase(updateDataProfile.rejected, (state) => {state.user.email="Ошибка"; state.user.name="Ошибка"; console.log("ошибка")})
    }


})

export const authorization = profileSlice.actions.authorization;
export const register = profileSlice.actions.register;
export const dataUser = profileSlice.actions.dataUser;
export const newAuthorizationToken = profileSlice.actions.newAuthorizationToken;
export const exit = profileSlice.actions.exit;
export const errorRequest = profileSlice.actions.errorRequest;

const profile = profileSlice.reducer
export default profile;