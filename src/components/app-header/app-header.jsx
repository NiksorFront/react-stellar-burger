import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={s.header}>
        <nav className={s.content}>
            <div className={s.navigation}>
                <a className={s.navigation__link}>
                    <BurgerIcon type="primary"/>
                    <p className="text text_type_main-default">Конструктор</p>
                </a>
                <a className={s.navigation__link}>
                    <ListIcon type="secondary"/>
                    <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                </a>
            </div>
            <Logo />
            <a className={s.navigation__link}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </a>
        </nav>
    </header>
  );

}