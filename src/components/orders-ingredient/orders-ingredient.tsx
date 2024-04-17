import { OrderType, useDispatch, useSelector } from "../../utils/prop-types";
import { v4 as uuidv4 } from "uuid";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./orders-ingredient.module.css"
import { popupContent, popupOpen } from "../../services/Slice/modalSlice";
import { useNavigate } from "react-router-dom";

export default function OrdersIngredient({order}:{order: OrderType}){
    const ingredients = useSelector(state => state.burgerIngredients.data)
    const idIngredientsinOrder = order.ingredients;
    
    const imageUrls: Array<string> = []                                      //Массив со всеми url на картинки
    const price: number = idIngredientsinOrder.reduce((total, ingredId) =>{  //Reduc'ом проходимся по каждому Id'шнику  
        const ingredient = ingredients.find(ingredient => {return ingredient?._id === ingredId})! //Находим ингредиент с этим id в списке всех возможных ингредиентов
        imageUrls.push(ingredient.image_mobile)                              //Добавляем ссылочку на картиночку на этот ингредиент в imageUrls

        return (total + ingredient.price)                                    //Суммируем до получения итоговой цены
    }, 0)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const popup = (): void => {
        dispatch(popupOpen(true))
        dispatch(popupContent({
            title: order.name,
            modal: "Order",
            content: order._id,
        }))
        navigate(`/profile/orders/${order._id}`)
    }

    return(<li className={s.order}  onClick={() => popup()}>
        <div className={s.info}>
            <p className="text text_type_digits-default">      #{order.number}      </p>
            <p className='text text_type_main-default text_color_inactive'>
                <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
            </p>
        </div>
        <h2 className={`text text_type_main-medium ${s.title}`}>   {order.name}   </h2>
        <p className={`text text_type_main-default ${s.done}`}>{order.status==="done" ? "Выполнен" : "В процессе"}</p>
        <div className={s.info}>
            <div>
                {imageUrls.map((img, index) => {
                    if (index < 5){
                        return (<img key={uuidv4()} src={img} className={s.img} alt="ингредиент"/>)
                    }
                    if(index === imageUrls.length-1){
                        return (<span key={uuidv4()} className={s.img_container}>
                                    <p className={`text text_type_main-default ${s.img_text}`}><br/>+{index}</p>
                                    <img src={img} className={`${s.img} ${s.img_overflowing}`} alt="ингредиент"/>
                                </span>)
                    }
                })}
            </div>
            <div className={s.price}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    </li>)
}