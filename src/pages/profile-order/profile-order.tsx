import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../utils/prop-types";
import Order from "../order/order";
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice"
import { updateDataProfile } from "../../services/Slice/profileSlice";
import { useNavigate } from "react-router-dom";
import OrderInfo from "../../components/order-info/order-info";
import { wsConnect } from "../../services/Slice/orderSlice/orderActions";
import { UrlMyOrders } from "../../utils/API";


export default function ProfileOrder(){
    const data = useSelector(state => state.profile);                //Получаем данные с хранилища
    const status = useSelector(state => state.orderReducer.status);  //Статус WS соединения
    
    const dispatch = useDispatch();
    const [dataUpd, setDataUpd] = useState(false); //Мини каастыль, чтобы обновить данные и только потом проверять на авторизованость в следующем useEffect()
    useEffect(() => {dispatch(updateDataProfile(dispatch))},[])  

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


    return(<div className="mt-15">{status==="open" && <OrderInfo/>}</div>)
}