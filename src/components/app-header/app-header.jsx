import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from './app-header.module.css';
import { useNavigate } from "react-router-dom";

export default function AppHeader() {

    const activConstr = window.location.pathname === "/" 
                    ? ['primary', 'text_color_active' ] 
                    : ['secondary', 'text_color_inactive']

    const activProf = window.location.pathname === "/profile" 
                    ? ['primary', 'text_color_active' ] 
                    : ['secondary', 'text_color_inactive']

    const navigate = useNavigate();
    return (
        <header className={s.header}>
            <nav className={s.content}>
                <div className={s.navigation} >
                    <div className={s.navigation__link} onClick={() => navigate("/", {state: null})}>
                        <BurgerIcon type={activConstr[0]}/>
                        <p className={`text text_type_main-default ${activConstr[1]}`}>Конструктор</p>
                    </div>
                    <a className={s.navigation__link}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                    </a>
                </div> 
                <Logo/>
                <div className={s.navigation__link} onClick={() => navigate("/profile")}>
                    <ProfileIcon type={activProf[0]}/>
                    <p className={`text text_type_main-default ${activProf[1]}`}>Личный кабинет</p>
                </div>
            </nav>
        </header>
    );

}