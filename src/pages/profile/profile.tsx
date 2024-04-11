import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./profile.module.css"
import { AuthorizationType, ProfileType, useDispatch, useSelector } from "../../utils/prop-types"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestAuth, requestPost } from "../../utils/API"
import { getCookie } from "../../utils/cookie"
import { exit, updateDataProfile } from "../../services/Slice/profileSlice"

export default function Profile(){
    const data = useSelector(state => state.profile);  //Получаем данные с хранилища
    const [name, setName] = useState("Загрузка...");
    const [email, setEmail] = useState("Загрузка...");
    const [password, setPassword] = useState("Загрузка...");


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dataUpd, setDataUpd] = useState(false); //Мини каастыль, чтобы обновить данные и только потом проверять на авторизованость в следующем useEffect()
    useEffect(() => {dispatch(updateDataProfile(dispatch))},[])

    useEffect(() => {
        if(data.isAuth){ //Проверяем зареган ли пользователь и если что обновляем
            setName(data.user.name); setEmail(data.user.email); setPassword(data.user.email);
        }else{
            dataUpd && navigate("/login");     //Переброс пользователя к авторизации, если он не авторизирован
        }

        setDataUpd(true);
    }, [data])   


    const exitProfile = () => {
        const token = getCookie('refreshToken'); //Получаем токен авторизации из куки
        requestPost([{token: token},"auth/logout"])
        .then((res: AuthorizationType) => {
            dispatch(exit(res))
            navigate("/")
        })
        .catch(() => console.log("Ошибка"))
    }

    const sendingNewData = () => {
        const token: string = getCookie('accessToken')!
        
        requestAuth('auth/user', "PATCH", token, {name: name, email: email})
        .then(() => console.log("Данные обновлены"))
        .catch(() => console.log("Ошибка"))
    }

    return (<main className={s.form}>
        <menu className={s.menu}>
            <li>
                <a className="text text_type_main-medium">Профиль</a>
            </li>
            <li >
                <a className="text text_type_main-medium text_color_inactive">История заказов</a>
            </li>
            <li onClick={() => exitProfile()}>
                <a className="text text_type_main-medium text_color_inactive">Выход</a>
            </li>
            <p className="text text_type_main-small text_color_inactive mt-20" >
                В этом разделе вы можете<br/>
                изменить свои персональные данные
            </p>
        </menu>
        <form className={s.editing}>
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
        </form>
    </main>)
}