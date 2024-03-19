import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./ingredient.module.css"
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch} from "react-redux";
import { popupContent, popupOpen } from "../../services/Slice/modalSlice";

export default function Ingredient({children, ingredients}){
    const count = "";
    const dispatch = useDispatch();

    
    function Popup(ingr){
        dispatch(popupOpen(true))
        dispatch(popupContent({
            title:"Детали ингредиента",
            content: <IngredientDetails imageURL={ingr.image_large}  
                                        title={ingr.name}
                                        calories={ingr.calories} 
                                        proteins={ingr.proteins} 
                                        fats={ingr.fat} 
                                        carbohydrates={ingr.carbohydrates}/>,
        }))
    }

    return(<div>
        <h4 className='text text_type_main-medium mt-15'>{children}</h4>
        <ul className={s.columns}>
            {ingredients.map(ingr => {return(
            <li key={ingr._id} className={s.column} onClick={() => Popup(ingr)}>
                {/*count будет задаваться и определён тут позже*/}
                {count && <Counter count={count} size="default" extraClass="m-1" />}
                <img src={ingr.image} alt={ingr.name} className={s.img}/>
                <div className={s.price}>
                    <p className="text text_type_digits-default">{ingr.price}</p>
                    <CurrencyIcon/>
                </div>
                <p className="text text_type_main-default">{ingr.name}</p>
            </li>)})}
        </ul>
    </div>)
}