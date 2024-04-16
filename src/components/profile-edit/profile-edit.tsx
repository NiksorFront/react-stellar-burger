import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../utils/prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDataProfile } from "../../services/Slice/profileSlice";
import { getCookie } from "../../utils/cookie";
import { requestAuth } from "../../utils/API";
import s from "./profile-edit.module.css"


export default function ProfileEdit(){
    const data = useSelector(state => state.profile);  //Получаем данные с хранилища
    const [name, setName] = useState("Загрузка...");
    const [email, setEmail] = useState("Загрузка...");
    const [password, setPassword] = useState("Загрузка...");

    const dispatch = useDispatch();
    const [dataUpd, setDataUpd] = useState(false); //Мини каастыль, чтобы обновить данные и только потом проверять на авторизованость в следующем useEffect()
    useEffect(() => {dispatch(updateDataProfile(dispatch))},[])  

    const navigate = useNavigate();
    useEffect(() => {
        if(data.isAuth){ //Проверяем зареган ли пользователь и если что обновляем
            setName(data.user.name); setEmail(data.user.email); setPassword(data.user.email);
        }else{
            dataUpd && navigate("/login");     //Переброс пользователя к авторизации, если он не авторизирован
        }

        setDataUpd(true);
    }, [data])

    
    const sendingNewData = () => {
        const token: string = getCookie('accessToken')!
        
        requestAuth('auth/user', "PATCH", token, {name: name, email: email})
        .then(() => console.log("Данные обновлены"))
        .catch(() => console.log("Ошибка"))
    }

    return(<form className={s.editing}>
        <EmailInput
            onChange={e => {setName(e.target.value); sendingNewData()}}
            value={name}
            name={'name'}
            placeholder="Имя"
            isIcon={true}
            extraClass="mt-6"
        />
        <EmailInput
            onChange={e => {setEmail(e.target.value); sendingNewData()}}
            value={email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mt-6"
        />
        <PasswordInput
            onChange={e => setPassword(e.target.value)}
            value={password}
            name={'password'}
            icon="EditIcon"
            extraClass="mt-6"
        />
    </form>)
}