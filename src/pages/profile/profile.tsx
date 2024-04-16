import s from "./profile.module.css"
import { AuthorizationType, useDispatch, useSelector,} from "../../utils/prop-types"
import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestPost } from "../../utils/API"
import { getCookie } from "../../utils/cookie"
import { exit } from "../../services/Slice/profileSlice"
import ProfileEdit from "../../components/profile-edit/profile-edit"
import Orders from "../../components/orders/orders"
import Modal from "../../components/modal/modal"
import OrderInfo from "../../components/order-info/order-info"
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice"




export default function Profile(){
    const popupTrueFalse = useSelector(state => state.modal.open)
    //const popupTitle = useSelector(state => state.modal.data.title)
    const popupModal = useSelector(state => state.modal.data.modal)
    const status = useSelector(state => state.orderReducer.status)

    const dispatch = useDispatch()
    useEffect(()=>{
        status!=="open" && dispatch(requestСomponents())                                       //Запрашиваем и получаем список компонентов с сервера
    }, [])
    
    const first: boolean = window.location.pathname.split("/").find(part => part==="orders") === "orders"


    const navigate = useNavigate();
    const exitProfile = () => {
        const token = getCookie('refreshToken'); //Получаем токен авторизации из куки
        requestPost([{token: token},"auth/logout"])
        .then((res: AuthorizationType) => {
            dispatch(exit(res))
            navigate("/")
        })
        .catch(() => console.log("Ошибка"))
    }

    
    return (<main className={s.form}>
        <menu className={s.menu}>
            <li onClick={() => navigate("/profile")} className={s.pointer}>
                <a className={`text text_type_main-medium ${!first ? 'text_color_active' : 'text_color_inactive'}`}>Профиль</a>
            </li>
            <li onClick={() => navigate("/profile/orders")} className={s.pointer}>
                <a className={`text text_type_main-medium ${first ? 'text_color_active' : 'text_color_inactive'}`}>История заказов</a>
            </li>
            <li onClick={() => exitProfile()} className={s.pointer}>
                <a className="text text_type_main-medium text_color_inactive">Выход</a>
            </li>
            <p className="text text_type_main-small text_color_inactive mt-20" >
                В этом разделе вы можете<br/>
                изменить свои персональные данные
            </p>
        </menu>
        {!first && <ProfileEdit/>}
        {first  && <Orders/>}
        {popupTrueFalse && <Modal title=" "  pathURL={"/profile/orders/"}>
            {popupModal==="Order" && <OrderInfo />}
        </Modal>}
    </main>)
}