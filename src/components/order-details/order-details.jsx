import s from "./order-details.module.css"
import decor from "../../images/decorated.png";
import { useSelector } from "react-redux";

export default function OrderDetails(){
    const number = useSelector(state => state.order.number)

    return(<div className={s.cntent}>
        <h3 className="text text_type_digits-large mt-4">{number}</h3>
        <p className="text text_type_main-medium mt-8">индификатор заказа</p>
        <img src={decor} className={s.img}/> 
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small mt-2 mb-30 text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>) 
}