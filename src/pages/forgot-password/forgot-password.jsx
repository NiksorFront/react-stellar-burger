import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "../authentication.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { requestNumber } from "../../utils/API";


export default function ForgotPassword(){
    const [value, setValue] = useState('');
    const [butDisbld, setButDisbld] = useState(!value.length);
    const navigate = useNavigate();

    const mailRequest = () => {
        setButDisbld(true)
        requestNumber([{"email": value}, "password-reset"])
        .then(res => {
            console.log(res)
            navigate("/reset-password")
            }
        )
        .catch(res => console.log("Ошибка"))
        .finally(() => setButDisbld(false))
    }
    
    console.log(butDisbld)
    return (<main className={s.form}>
        <h1 className="text text_type_main-medium text_color_active">Восстановление пароля</h1>
        <Input
            type={'text'}
            placeholder={'Укажите e-mail'}
            onChange={(e) => {setValue(e.target.value); 
                              setButDisbld(value.length<4)}}
            value={value}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
        />
        <Button htmlType="button" type="primary" disabled={butDisbld} size="small" extraClass="mt-6" onClick={() => mailRequest()}>
            <p className="text text_type_main-small">Восстановить</p> 
        </Button>
        <p className="text text_type_main-small text_color_inactive mt-20">
            Вспомнили пароль? <Link to={{pathname: "/reset-password"}} className={s.active}>Войти</Link>
        </p>
    </main>)
}