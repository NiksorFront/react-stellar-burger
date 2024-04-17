import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { getCookie } from "../../utils/cookie";
import { requestAuth } from "../../utils/API";
import s from "./profile-edit.module.css"
import { useSelector } from "../../utils/prop-types";


export default function ProfileEdit(){
    const data = useSelector(state => state.profile);  //Получаем данные с хранилища
    const [name, setName] = useState(data.user.name);
    const [email, setEmail] = useState(data.user.email);
    const [password, setPassword] = useState(data.user.email);

    //setName("Загрузка..."); setEmail("Загрузка..."); setPassword("Загрузка...")
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