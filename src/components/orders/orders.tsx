import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../utils/prop-types";
import s from "./orders.module.css"
import { updateDataProfile } from "../../services/Slice/profileSlice";
import { useNavigate } from "react-router-dom";
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice"
import { wsClose, wsConnect } from "../../services/Slice/orderSlice/orderActions";
import { UrlMyOrders } from "../../utils/API";
import { v4 as uuidv4 } from "uuid";
import OrdersIngredient from "../orders-ingredient/orders-ingredient";

export default function Orders(){
    const data = useSelector(state => state.profile);                //Получаем данные с хранилища
    const status = useSelector(state => state.orderReducer.status);  //Статус WS соединения
    const table = useSelector(state => state.orderReducer.table);

    const dispatch = useDispatch();
    const [dataUpd, setDataUpd] = useState(false); //Мини каастыль, чтобы обновить данные и только потом проверять на авторизованость в следующем useEffect()
    useEffect(() => {
        dispatch(updateDataProfile(dispatch))
        return () => {dispatch(wsClose())}
    },[])  

    const navigate = useNavigate();
    useEffect(() => {
        if (data.isAuth){                                                                          //Если авторизирован:
            status!=="open" && dispatch(requestСomponents())                                       //Запрашиваем и получаем список компонентов с сервера
            status!=="open" && dispatch(wsConnect({wsUrl: UrlMyOrders, withToken: true}))          //Установливем WebSocket соединение
        } else{                                                                                    //Если нет:
            dataUpd && navigate("/login");                                                         //перебрасываем к авторизации
        }
        setDataUpd(true);
    }, [data])

    return(<ul className={s.ingredients}>
        {table.success && table.orders.map(order => <OrdersIngredient key={uuidv4()} order={order}/>)}
    </ul>)
}