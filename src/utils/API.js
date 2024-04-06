const URL = 'https://norma.nomoreparties.space/api';
const token = 'dfad8615-a69b-4969-abcf-da90e50e7e80';

function getResponse(res){
    return res.ok
           ? res.json()
           : res.json().then(err => Promise.reject(err))
}

//Доступные endopoint'ы: 'ingredients'
export async function request(endpoint){
    const res = await fetch(`${URL}/${endpoint}`)

    return await getResponse(res)
}

//Доступные endopoint'ы: 'auth/user'
export async function requestAuth(endpoint, data){
    const res = await fetch(`${URL}/${endpoint}`,{
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: data
                    }
                })
    

    return await getResponse(res)
}


/*Доступные endopoint'ы: 'ordres', 
                         'password-reset', 'password-reset/reset'
                         'auth/login', 'auth/register', 'auth/logout', 'auth/token'
                         */
export async function requestPost([ingredients, endpoint]){
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