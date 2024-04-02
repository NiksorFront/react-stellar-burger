import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "../authentication.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { requestNumber } from "../../utils/API";


export default function ResetPassword(){
    const [mail, setMail] = useState('');
    const [code, setCode] = useState('');
    const [butDisbld, setButDisbld] = useState(!mail.length || !code.length);
    const navigate = useNavigate();

    const resetRequest = () => {
        setButDisbld(true)
        requestNumber([{"password": mail,
                        "token": code}, "password-reset/reset"])  //Почему-то пишет, что такой URL не найден, хотя я его беру из задания
        .then(res => {
            console.log(res)
            //Тут чёто будет
            }
        )
        .catch(res => console.log("Ошибка"))
        .finally(() => setButDisbld(false))
    }

    return (<main className={s.form}>
        <h1 className="text text_type_main-medium text_color_active">Восстановление пароля</h1>
        <PasswordInput name={'password'} 
                       extraClass="mt-6" 
                       value={mail} 
                       onChange={e => {setMail(e.target.value); setButDisbld(mail.length<2 || code.length<2)}}/>
        <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => {setCode(e.target.value); setButDisbld(mail.length<2 || code.length<2)}}
            value={code}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
        />
        <Button htmlType="button" type="primary" disabled={butDisbld} size="small" extraClass="mt-6" onClick={() => resetRequest()}>
            <p className="text text_type_main-small">Сохранить</p> 
        </Button>
        <p className="text text_type_main-small text_color_inactive mt-20">
            Вспомнили пароль? <Link to={{pathname: "/login"}} className={s.active}>Войти</Link>
        </p>
    </main>)
}