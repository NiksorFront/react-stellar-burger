import { useEffect } from "react";
import OrderInfo from "../../components/order-info/order-info";
import { useDispatch, useSelector } from "../../utils/prop-types";
import s from "./order.module.css"
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice/BurgerIngredientsSlice"
import { wsClose, wsConnect } from "../../services/Slice/orderSlice/orderActions";
import { UrlAllOrders } from "../../utils/API";

export default function Order(){
    const status = useSelector(state => state.orderReducer.status);
    const table = useSelector(state => state.orderReducer.table);

    const dispatch = useDispatch()
    useEffect(()=>{
        status !== "open" && dispatch(requestСomponents())                                //Запрашиваем и получаем список компонентов с сервера
        status !== "open" && dispatch(wsConnect({wsUrl: UrlAllOrders, withToken: false})) //Установливем WebSocket соединение
    
        return () => {
            (window.location.pathname.split("/").find(i => i==="orders") === undefined) && dispatch(wsClose())
        }
    }, [])


    return(<div className={s.form}>
        {status==="open" && <OrderInfo />}
    </div>)
}