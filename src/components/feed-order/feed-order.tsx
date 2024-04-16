import { useSelector } from "../../utils/prop-types"
import {v4 as uuidv4} from "uuid"
import s from "./feed-order.module.css"
import FeedOrderElement from "../feed-order-element/feed-order-element"



export default function FeedOrder(){
    const status = useSelector(state => state.orderReducer.status)
    const table = useSelector(state => state.orderReducer.table)

    return(<section className={s.feed_order}>
        <h2 className='text text_type_main-large mt-10'>Лента заказов</h2>
        {status === "loading" && <p key={"123"} className={`text text_type_main-medium ${s.loading}`}>Идёт загрузка</p>}
        <ul className={s.ingredients}>
            {status === "open" &&
            table.orders.map(order => <FeedOrderElement key={uuidv4()} order={order}/>)}
        </ul>
    </section>)
}