import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./ingredient-list.module.css"
import { useDispatch} from "react-redux";
import { popupContent, popupOpen } from "../../services/Slice/modalSlice";
import { useDrag } from "react-dnd";


function Ingr({ingr, callback}){ 
    const [,dragRef] = useDrag({type:"component", 
                                item:{id: ingr._id},
                              })

    return(
        <li className={s.column} 
            onClick={() => callback(ingr)}
            ref={dragRef}
           >
            {/*в __v я решил записывать значение count*/}
            {(ingr.__v > 0) && <Counter count={ingr.__v} size="default" extraClass="m-1" />}
            <img src={ingr.image} alt={ingr.name} className={s.img}/>
            <div className={s.price}>
                <p className="text text_type_digits-default">{ingr.price}</p>
                <CurrencyIcon/>
            </div>
            <p className="text text_type_main-default">{ingr.name}</p>
        </li>)
}

export default function IngredientList({children, ingredients}){
    const dispatch = useDispatch();

    function popup(ingr){
        dispatch(popupOpen(true))
        dispatch(popupContent({
            title:"Детали ингредиента",
            modal: "IngredientDetails",
            content: ingr,
        }))
    }

    return(<div>
        <h4 className='text text_type_main-medium mt-15'>{children}</h4>
        <ul className={s.columns}>
            {ingredients.map(ingr => <Ingr ingr={ingr} callback={popup} key={ingr._id}/>)}
        </ul>
    </div>)
}