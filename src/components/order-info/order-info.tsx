import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { IngredientType, useSelector } from "../../utils/prop-types"
import { v4 as uuidv4 } from "uuid"
import s from "./order-info.module.css"


type IngredType = {ingr: IngredientType}
function Ingred({ingr}: IngredType){
    return <li className={s.ingr}>
        <img src={ingr.image_mobile} className={s.img} alt="ингредиент"/>
        <p className='text text_type_main-default'>{ingr.name}</p>
        <div className={s.price}>
            <p className="text text_type_digits-default">{ingr.price}</p>
            <CurrencyIcon type="primary" />
        </div>
    </li>
}


export default function OrderInfo(){
    const orderId = window.location.pathname.split("/").slice(-1)[0]
    //const orderId = useSelector(state => state.modal.data.content);
    const ingredients = useSelector(state => state.burgerIngredients.data);
    const table = useSelector(state => state.orderReducer.table);

    
    const order = table.orders.find(ord => (ord._id === orderId))!       //Инфа о заказе
    const orderIngredients: Array<IngredientType> = []                  //Массив со всеми ингредиентами заказа
    let price: number = 0;     
                                             //Итоговая цена
    //console.log(order)
    order.ingredients.forEach((ingredId) =>{                            //Проходимся по массиву Id'шников с ингредиентами заказа 
        const ingredient = ingredients.find(ingredient => (ingredient?._id === ingredId))! //Находим ингредиент с этим id в списке всех возможных ингредиентов
        orderIngredients.push(ingredient);                              //Добавляем этот ингредиент в orderIngredients

        price = price + ingredient.price;                               //Суммируем для получения итоговой стоимости
    })


    return(<div className={s.content}>
        <h2 className={`text text_type_digits-default ${s.center}`}>#{order.number}</h2>
        <h1 className="text text_type_main-medium mt-10">{order.name}</h1>
        <p className={`text text_type_main-default mt-3 ${s.done}`}>{order.status==="done" ? "Выполнен" : "В процессе"}</p>
        <p className="text text_type_main-medium mt-15">Состав:</p>
        <ul className={s.ingreds}>
            {orderIngredients.map(ingr => <Ingred key={uuidv4()}  ingr={ingr}/>)}
        </ul>
        <div className={s.info}>
            <p className='text text_type_main-default text_color_inactive'>
                <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
            </p>
            <div className={s.price}>
                <p className="text text_type_digits-default">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    </div>)
}