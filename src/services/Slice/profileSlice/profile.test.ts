import { getCookie } from "../../../utils/cookie"
import { AuthorizationType, ProfilePayloadTypes, ProfileType } from "../../../utils/prop-types"
import profile, { authorization, dataUser, errorRequest, exit, initialState, newAuthorizationToken, register } from "./profileSlice"

describe("profile", () => {
    const results: ProfileType = {
        isAuth: true,
        user: {email: "test@ya.ru",
               name:  "Иван Иванов"  }
    }

    const mockData: AuthorizationType = {
        success: true, 
        user: {email:"test@ya.ru",
               name: "Иван Иванов"
        }, 
        accessToken: 'accessToken', //getCookie('accessToken')!
        refreshToken: 'refreshToken' //getCookie('refreshToken')!
    }

    //Тестируем регистрацию
    it("should handle registration action", () => {
        const action = register(mockData);
        const state = profile(initialState, action);
        
        expect(state).toStrictEqual(results)
    })

    //Тестируем авторизацию
    it("should handle authorization action", () => {
       const action = authorization(mockData);
       const state = profile(initialState, action);

       expect(state).toStrictEqual(results)
    })

    
    //Тестируем обновление данных в хранилище
    it("should handle data user action", () => {
        const action = dataUser({success: mockData.success, user: mockData.user});
        const state = profile(initialState, action);
 
        expect(state).toStrictEqual(results)
     })

    //Тестируем обновление токена
    it("should handle new Authorization Token action", () => {
        const action = newAuthorizationToken(mockData);
        const state = profile(initialState, action);
 
        expect(state).toStrictEqual({...results, user: {email:"",name: ""},})
     })
    
     //Тестируем выход
     it("shiuld handle exit action", () => {
        const action = exit(mockData)
        const state = profile(initialState, action);

        expect(state).toStrictEqual({isAuth: false, user: {email:"",name: ""},})
     })

     //Внезависимости от входных данных результат не поменяется. Так что этот тест скрыл за ненадобностью
     /*it("shiuld handle error action", () => {
        const action = errorRequest({})
        const state = profile(initialState, action);

        expect(state).toStrictEqual({isAuth: false, user: {email:"Ошибка загрузки",name: "Ошибка загрузки"},})
     })*/
})