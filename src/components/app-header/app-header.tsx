import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from './app-header.module.css';
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
    const activConstr: boolean = window.location.pathname === "/";
    const activFeed: Boolean = window.location.pathname === "/feed";
    const activProf: boolean = window.location.pathname === "/profile";

    const navigate = useNavigate();
    return (
        <header className={s.header}>
            <nav className={s.content}>
                <div className={s.navigation} >
                    <div className={s.navigation__link} onClick={() => navigate("/", {state: null})}>
                        <BurgerIcon type={activConstr
                                          ? 'primary'
                                          : 'secondary'}/>
                        <p className={`text text_type_main-default 
                                      ${activConstr ? 'text_color_active' : 'text_color_inactive'}`}>Конструктор</p>
                    </div>
                    <a className={s.navigation__link} onClick={() => navigate('/feed')}>
                        <ListIcon type={activFeed
                                        ? 'primary'
                                        : 'secondary'}/>
                        <p className={`text text_type_main-default
                                      ${activFeed 
                                      ? 'text_color_active' 
                                      : 'text_color_inactive'}`}>Лента заказов</p>
                    </a>
                </div> 
                <Logo/>
                <div className={s.navigation__link} onClick={() => navigate("/profile")}>
                    <ProfileIcon type={activProf
                                       ?'primary'
                                       :'secondary'}/>
                    <p className={`text text_type_main-default 
                                  ${activProf 
                                    ? 'text_color_active' 
                                    : 'text_color_inactive'}`}>Личный кабинет</p>
                </div>
            </nav>
        </header>
    );

}