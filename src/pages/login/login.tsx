import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "../authentication.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { requestPost } from "../../utils/API";
import { authorization, updateDataProfile } from "../../services/Slice/profileSlice/profileSlice";
import { AuthorizationType, useDispatch, useSelector} from "../../utils/prop-types";

export default function Login(){
    const isAuth = useSelector(state => state.profile.isAuth)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [butDisbld, setButDisbld] = useState(!(email || password));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        isAuth ? navigate("/")                          //Переброс пользователя к конструктору, если он авторизирован      
               : dispatch(updateDataProfile(dispatch))  //Обновляем хранилище данными с сервера     
    }, [isAuth])

    const requestAuth = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        requestPost([{email: email, 
                      password: password},
                    "auth/login"])
        .then((res: AuthorizationType) => {
                dispatch(authorization(res));                               
                navigate("/")
            })
        .catch(() => console.log("ошибка"))
        .finally(() => setButDisbld(false))
    }

    return (<main className={s.form}>
        <h1 className="text text_type_main-medium text_color_active">Вход</h1>
        <form className={s.form_submit} onSubmit={(e) => requestAuth(e)}>
            <EmailInput
                onChange={e => {setEmail(e.target.value)
                                setButDisbld(email.length<2 || password.length<2)}}
                value={email}
                name={'email'}
                size={'default'}
                extraClass="mt-6"
            />
            <PasswordInput name={'password'}
                        onChange={e => {setPassword(e.target.value)
                                        setButDisbld(email.length<2 || password.length<2)}}
                        value={password}
                        extraClass="mt-6"
            />
            <Button htmlType="submit" type="primary" size="small" extraClass="mt-6" disabled={butDisbld}> 
                <p className="text text_type_main-small">Войти</p> 
            </Button>
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
            Вы - новый пользователь? <Link to={{pathname: "/register"}} className={s.active}>
                                     Зарегестрироваться</Link>
        </p>
        <p className="text text_type_main-small text_color_inactive mt-4">
            Забыли пароль? <Link to={{pathname: "/forgot-password"}} className={s.active}>Восстановить</Link>
        </p>

    </main>)
}