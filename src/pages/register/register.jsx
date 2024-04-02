import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "../authentication.module.css"
import { Link } from "react-router-dom"

export default function Register(){
    return (<main className={s.form}>
        <h1 className="text text_type_main-medium text_color_active">Регистрация</h1>
        <Input
            type={'text'}
            placeholder={'Имя'}
            //onChange={e => setValue(e.target.value)}
            //icon={'CurrencyIcon'}
            //value={value}
            name={'name'}
            error={false}
            //ref={inputRef}
            //onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
        />
        <Input
            type={'text'}
            placeholder={'E-mail'}
            //onChange={e => setValue(e.target.value)}
            //icon={'CurrencyIcon'}
            //value={value}
            name={'name'}
            error={false}
            //ref={inputRef}
            //onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
        />
        <PasswordInput name={'password'} extraClass="mt-6" />
        <Button htmlType="button" type="primary" size="small" extraClass="mt-6">
            <p className="text text_type_main-small">Войти</p> 
        </Button>
        <p className="text text_type_main-small text_color_inactive mt-20">
            Уже Зарегестрированы? <Link to={{pathname: "/login"}} className={s.active}>Войти</Link>
        </p>
    </main>)
}