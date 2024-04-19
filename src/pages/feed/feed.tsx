import { useEffect } from "react";
import FeedInfo from "../../components/feed-info/feed-info";
import FeedOrder from "../../components/feed-order/feed-order";
import { useDispatch, useSelector } from "../../utils/prop-types";
import { UrlAllOrders } from "../../utils/API"
import {requestСomponents as requestComponents} from "../../services/Slice/burgerIngredientsSlice/BurgerIngredientsSlice"

import s from "./feed.module.css"
import { wsClose, wsConnect, wsDisconnect } from "../../services/Slice/orderSlice/orderActions";
import Modal from "../../components/modal/modal";
import OrderInfo from "../../components/order-info/order-info";
import Loading from "../../components/loading/loading";

export default function Feed(){
    const popupTrueFalse = useSelector(state => state.modal.open)
    //const popupTitle = useSelector(state => state.modal.data.title)
    const popupModal = useSelector(state => state.modal.data.modal)
    const status = useSelector(state => state.orderReducer.status)

    const dispatch = useDispatch()
    useEffect(()=>{
        status!=="open" && dispatch(requestComponents());                                //Запрашиваем и получаем список компонентов с сервера
        status!=="open" && dispatch(wsConnect({wsUrl: UrlAllOrders, withToken: false})); //Установливем WebSocket соединение
   
        return () => {
            (window.location.pathname.split("/").find(i => i==="feed") === undefined) && dispatch(wsClose())
        }
    }, [])

    return(status==="open" 
           ? <main className={s.main}>
                <FeedOrder/>
                <FeedInfo/>
                {popupTrueFalse && <Modal title=" "  pathURL={"/feed"}>
                    {popupModal==="Order" && <OrderInfo />}
                </Modal>}
             </main>
           : <Loading/>)
}