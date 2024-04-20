export const URL = 'https://norma.nomoreparties.space/api';
export const UrlMyOrders = "wss://norma.nomoreparties.space/orders";
export const UrlAllOrders = "wss://norma.nomoreparties.space/orders/all";

function getResponse(res:Response){
    return res.ok
           ? res.json()
           : res.json().then(err => Promise.reject(err))
}

//Доступные endopoint'ы: 'ingredients'
export async function request(endpoint: string){
    const res = await fetch(`${URL}/${endpoint}`)

    return await getResponse(res)
}

//Доступные endopoint'ы: 'auth/user'
export async function requestAuth(endpoint: string, method: string, token: string, data?: object){
    const res = await fetch(`${URL}/${endpoint}`,{
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token
                    },
                    body: data ? (JSON.stringify(data)) : undefined
                })
    

    return await getResponse(res)
}


type requestPostTypes = [{"ingredients"?: Array<string>,
                          "password"?: string,
                          "email"?: string,
                          token?: string,
                          name?: string
                         }, string]

/*Доступные endopoint'ы: 'ordres', 
                         'password-reset', 'password-reset/reset'
                         'auth/login', 'auth/register', 'auth/logout', 'auth/token'
                         */
export async function requestPost([ingredients, endpoint]:requestPostTypes){
    const res = await fetch(`${URL}/${endpoint}`, {
                             method: 'POST',
                             headers: {
                                "Content-Type": "application/json",
                             },
                             body: JSON.stringify(ingredients),
                            })
 
    return await getResponse(res)                     
}

//JSON.stringify()