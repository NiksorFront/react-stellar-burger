import s from "./profile.module.css"
import { AuthorizationType, useDispatch, useSelector,} from "../../utils/prop-types"
import {  useEffect, useState } from "react"
import { requestPost } from "../../utils/API"
import { getCookie } from "../../utils/cookie"
import { exit, updateDataProfile } from "../../services/Slice/profileSlice/profileSlice"
import ProfileEdit from "../../components/profile-edit/profile-edit"
import Orders from "../../components/orders/orders"
import Modal from "../../components/modal/modal"
import OrderInfo from "../../components/order-info/order-info"
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice/BurgerIngredientsSlice"
import Loading from "../../components/loading/loading"
import { useNavigate } from "react-router-dom"




export default function Profile(){
    const data = useSelector(state => state.profile);  //Получаем данные с хранилища
    const popupTrueFalse = useSelector(state => state.modal.open)
    //const popupTitle = useSelector(state => state.modal.data.title)
    const popupModal = useSelector(state => state.modal.data.modal)
    const status = useSelector(state => state.orderReducer.status)

    const dispatch = useDispatch()
    const [dataUpd, setDataUpd] = useState(false); //Мини каастыль, чтобы обновить данные и только потом проверять на авторизованость в следующем useEffect()
    useEffect(()=>{dispatch(updateDataProfile(dispatch))}, [])

    const navigate = useNavigate();
    useEffect(() => {
        status!=="open" && dispatch(requestСomponents())                                       //Запрашиваем и получаем список компонентов с сервера
    
        if(!data.isAuth){ //Проверяем зареган ли пользователь и если что обновляем
            dataUpd && navigate("/login");     //Переброс пользователя к авторизации, если он не авторизирован
        }
        setDataUpd(true);
    }, [data])

    
    const first: boolean = window.location.pathname.split("/").find(part => part==="orders") === "orders"

    const exitProfile = () => {
        const token = getCookie('refreshToken'); //Получаем токен авторизации из куки
        requestPost([{token: token},"auth/logout"])
        .then((res: AuthorizationType) => {
            dispatch(exit(res))
            navigate("/")
        })
        .catch(() => console.log("Ошибка"))
    }

    
    return (data.isAuth
            ? <main className={s.form}>
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
             </main> 
            : <Loading/>)
}