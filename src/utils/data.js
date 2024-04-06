import { getCookie } from "./cookie";
import { requestAuth, requestPost } from "./API";
import { dataUser, newAuthorizationToken } from "../services/Slice/profileSlice";

//Функция обновляет состояние в хранилище
export default async function updateData(dispatch){
   const token = getCookie('accessToken'); //Получаем токен авторизации из куки
   let success = false;

   if (token){//Если токен есть, то запрашиваем данные, которые отображаем в <Input/>
        await requestAuth('auth/user', token)
              .then(res => {
                  dispatch(dataUser(res))
                  success = true
              })
              .catch(err => {
                  console.log(err)
                  success = false
              })
    }
    else{//Если токена нет, то запрашиваем новый
        await requestPost([{token: getCookie('refreshToken')}, 'auth/token'])
             .then(res => dispatch(newAuthorizationToken(res)))
             .catch(err => console.log(err))
    }

    return success
}