import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./ingredient-list.module.css"
import { Child, useDispatch} from "../../utils/prop-types";
import { popupContent, popupOpen } from "../../services/Slice/modalSlice/modalSlice";
import { useDrag } from "react-dnd";
import { useNavigate} from "react-router-dom";
import { IngredientType } from "../../utils/prop-types";


function Ingr({ingr}:{ingr: IngredientType}){ 
    const [,dragRef] = useDrag({type:"component", 
                                item:{id: ingr._id},
                              })
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function popup(ingr:IngredientType){
        dispatch(popupOpen(true))
        dispatch(popupContent({
            title:"Детали ингредиента",
            modal: "IngredientDetails",
            content: ingr._id,
        }))
        navigate(`/ingredients/${ingr._id}`)
    }

    return(
        <li className={s.column} 
            onClick={() => popup(ingr)}
            ref={dragRef}
            data-cy="ingredient" //Для тестирование через Cypress
           >
            {/*в __v я решил записывать значение count*/}
            {(ingr.__v > 0) && <Counter count={ingr.__v} size="default" extraClass="m-1" />}
            <img src={ingr.image} alt={ingr.name} className={s.img}/>
            <div className={s.price}>
                <p className="text text_type_digits-default">{ingr.price}</p>
                <CurrencyIcon type="primary"/> 
            </div>
            <p className="text text_type_main-default">{ingr.name}</p>
        </li>)
}

type propsType = Child & {ingredients: Array<IngredientType>}

export default function IngredientList({children, ingredients}:propsType){
    return(<div>
        <h4 className='text text_type_main-medium mt-15'>{children}</h4>
        <ul className={s.columns}>
            {ingredients.map((ingr:IngredientType) => <Ingr ingr={ingr} key={ingr._id}/>)}
        </ul>
    </div>)
}