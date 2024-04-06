import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "../authentication.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { requestPost } from "../../utils/API";
import { register, updateDataProfile } from "../../services/Slice/profileSlice";
import { useDispatch, useSelector} from "react-redux";

export default function Register(){
    const isAuth = useSelector(state => state.profile.isAuth)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [butDisbld, setButDisbld] = useState(!(name || email || password));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        isAuth ? navigate("/")                          //Переброс пользователя к конструктору, если он авторизирован      
               : dispatch(updateDataProfile(dispatch))  //Обновляем хранилище данными с сервера     
    }, [isAuth])

    const requestRegister = () => {
        setButDisbld(true)
        requestPost([{email: email,
                      password: password,
                      name: name   },
                      "auth/register"
                    ])
        .then(res => {
            register(res);
        })
        .catch(err => console.log("ошибка:", err))
        .finally(() => setButDisbld(false))
    }

    return (<main className={s.form}>
        <h1 className="text text_type_main-medium text_color_active">Регистрация</h1>
        <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => {setName(e.target.value)
                            setButDisbld(name.length<2 || email.length<2 || password.length<2)}}
            value={name}
            name={'name'}
            size={'default'}
            extraClass="mt-6"
        />
        <EmailInput
            onChange={e => {setEmail(e.target.value)
                            setButDisbld(name.length<2 || email.length<2 || password.length<2)}}
            value={email}
            name={'email'}
            size={'default'}
            extraClass="mt-6"
        />
        <PasswordInput name={'password'}
                       onChange={e => {setPassword(e.target.value)
                                       setButDisbld(name.length<2 || email.length<2 || password.length<2)}}
                       value={password}
                       extraClass="mt-6"
        />
        <Button htmlType="button" type="primary" disabled={butDisbld} size="small" extraClass="mt-6" onClick={requestRegister}>
            <p className="text text_type_main-small">Войти</p> 
        </Button>
        <p className="text text_type_main-small text_color_inactive mt-20">
            Уже Зарегестрированы? <Link to={{pathname: "/login"}} className={s.active}>Войти</Link>
        </p>
    </main>)
}