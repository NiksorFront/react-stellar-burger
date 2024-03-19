const URL = 'https://norma.nomoreparties.space/api';

function getResponse(res){
    return res.ok
           ? res.json()
           : res.json().then(err => Promise.reject(err))
}

//Доступные endopoint'ы - 'ingredients'
export default async function request(endpoint){
    const res = await fetch(`${URL}/${endpoint}`)

    return getResponse(res)
}