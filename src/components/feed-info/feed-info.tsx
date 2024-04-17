import order from "../../services/Slice/orderSlice/orderSlice";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "../../utils/prop-types"
import s from "./feed-info.module.css"

export default function FeedInfo(){
    const status = useSelector(state => state.orderReducer.status)
    const table = useSelector(state => state.orderReducer.table)

    const dones: Array<number> = []
    const pendings: Array<number> = []
    table.orders.forEach(order => {
        (order.status === "done") 
        ? dones.push(order.number)
        : pendings.push(order.number)
    });

    return(<section className={s.feed_info}>
        <div className={`${s.done}`}>
            <h3 className='text text_type_main-medium'>Готовы:</h3>
            <ul className={`${s.done_list}`}>
                {dones.map(number => <li key={uuidv4()} className="text text_type_digits-default mr-5">{number}</li>)}
            </ul>
        </div>
        <div className={`${s.at_work}`}>
            <h3 className='text text_type_main-medium'>В работе:</h3>
            <ul className={`${s.at_work_list}`}>
                {pendings.map(number => <li key={uuidv4()} className="text text_type_digits-default mr-5">{number}</li>)}
            </ul>
        </div>
        <div className={`${s.completedAll}`}>
            <h3 className='text text_type_main-medium'>Выполнено за всё время:</h3>
            <p className="text text_type_digits-large">{table.total}</p>
        </div>
        <div className={`${s.completedToday}`}> 
            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
            <p className="text text_type_digits-large">{table.totalToday}</p>
        </div>
    </section>)
}