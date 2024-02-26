import s from "./order-details.module.css"
import decor from "../../images/decorated.png";
import PropTypes from 'prop-types';

export default function OrderDetails({numberOreder}){
    return(<div className={s.cntent}>
        <h3 className="text text_type_digits-large mt-4">{numberOreder}</h3>
        <p className="text text_type_main-medium mt-8">индификатор заказа</p>
        <img src={decor} className={s.img}/> 
        <p className="text text_type_main-small">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small mt-2 mb-30 text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>) 
}

OrderDetails.propTypes = {
    numberOreder: PropTypes.number
}

//Как начнём сами геннерить номер заказа - это надо будет удалить
OrderDetails.defaultProps = {
    numberOreder: parseInt('034536')
}