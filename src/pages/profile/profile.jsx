import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./profile.module.css"
import { useDispatch, useSelector } from "react-redux"
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
    useEffect(() => dispatch(updateDataProfile(dispatch)),[])

    useEffect(() => {
        data.isAuth ? (setName(data.user.name) || setEmail(data.user.email) || setPassword(data.user.email))//Проверяем зареган ли пользователь и если что обновляем
                    : dataUpd && navigate("/login");                                    //Переброс пользователя к авторизации, если он не авторизирован
        setDataUpd(true);
    }, [data])   


    const exitProfile = () => {
        const token = getCookie('refreshToken'); //Получаем токен авторизации из куки
        requestPost([{token: token},"auth/logout"])
        .then(res => {
                      dispatch(exit(res))
                      navigate("/")
                })
        .catch(err => console.log(err))
    }

    const sendingNewData = () => {
        const token = getCookie('accessToken')
        
        requestAuth('auth/user', "PATCH", token, {name: name, email: email})
        .then(() => console.log("Данные обновлены"))
        .catch(err => console(err))
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
                error={false}
                extraClass="mt-6"
            />
            <EmailInput
                onChange={e => {setEmail(e.target.value); sendingNewData()}}
                value={email}
                name={'email'}
                placeholder="Логин"
                isIcon={true}
                error={false}
                extraClass="mt-6"
            />
            <PasswordInput
                onChange={e => setPassword(e.target.value)}
                value={password}
                name={'password'}
                icon="EditIcon"
                error={false}
                extraClass="mt-6"
            />
        </form>
    </main>)
}