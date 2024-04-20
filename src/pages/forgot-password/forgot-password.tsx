import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "../authentication.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { requestPost } from "../../utils/API";
import { useDispatch, useSelector } from "../../utils/prop-types";
import { updateDataProfile } from "../../services/Slice/profileSlice/profileSlice";



export default function ForgotPassword(){
    const isAuth = useSelector(state => state.profile.isAuth)
    const [value, setValue] = useState('');
    const [butDisbld, setButDisbld] = useState(!value.length);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        isAuth ? navigate("/")                          //Переброс пользователя к конструктору, если он авторизирован      
               : dispatch(updateDataProfile(dispatch))  //Обновляем хранилище данными с сервера       
    }, [isAuth])

    const mailRequest = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setButDisbld(true)
        requestPost([{"email": value}, "password-reset"])
        .then(() => navigate("/reset-password", {state:"transferTrue"}))
        .catch(() => console.log("Ошибка"))
        .finally(() => setButDisbld(false))
    }

    return (<main className={s.form}>
        <h1 className="text text_type_main-medium text_color_active">Восстановление пароля</h1>
        <form className={s.form_submit} onSubmit={(e) => mailRequest(e)}>
            <EmailInput
                onChange={(e) => {setValue(e.target.value); 
                                setButDisbld(value.length<4)}}
                value={value}
                name={'email'}
                extraClass="mt-6"
            />
            <Button htmlType="submit" type="primary" disabled={butDisbld} size="small" extraClass="mt-6">
                <p className="text text_type_main-small">Восстановить</p> 
            </Button>
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
            Вспомнили пароль? <Link to={{pathname: "/reset-password"}} className={s.active}>Войти</Link>
        </p>
    </main>)
}