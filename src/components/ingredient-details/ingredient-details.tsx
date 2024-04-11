import { ingredientType, useDispatch, useSelector } from "../../utils/prop-types"
import s from "./ingredient-details.module.css"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice"


//type propsType = { [key: string]: string }
type macronutrientTypes = {keyId:string, 
                  number:number, 
                  children:string}
    

function Macronutrient({keyId, number, children}:macronutrientTypes){
    return (<li key={keyId} style={{color: "rgba(133, 133, 173, 1)"}}>
                <p className="text text_type_main-small text_color_inactive">{children}</p>
                <p className="text text_type_digits-default text_color_inactive">{number}</p>
            </li>)
}

export default function IngredientDetails(){
    //const {image_large: imageURL, name, calories, proteins, fat, carbohydrates} = useSelector(state => state.modal.data.content);

    const ingredients = useSelector((state) => state.burgerIngredients)
    const dispatch = useDispatch();
    useEffect(() => {dispatch(requestСomponents())}, []) //Запрашиваем и получаем список компонентов с сервера
    const idIngrds= useLocation().pathname.slice(13); //Тут мы срезаем начииная с 13(т.е. убираем /ingredients/), чтобы получить id игридиента, 
    
    const {image_large: imageURL, name, calories, proteins, fat, carbohydrates}:ingredientType = ingredients.success 
                                                                                                 ? ingredients.data.find(ingred => ingred._id===idIngrds)!
                                                                                                 : {calories: 0, carbohydrates: 0, fat: 0, image: "", image_large: "", image_mobile: "", name: "Загрузка...", price: 0, proteins: 0, type: "", uniqueId: "", __v: 0, _id: ""}
    
    return(<div className={s.cntent}>
        <img src={imageURL} className={s.img}/> 
        <h3 className="text text_type_main-medium mt-4">{name}</h3>
        <ul className={s.macronutrients}>
            <Macronutrient keyId='1' number={calories}>Калории, ккал</Macronutrient>
            <Macronutrient keyId='2' number={proteins}>Белки, г</Macronutrient>
            <Macronutrient keyId='3' number={fat}>Жиры, г</Macronutrient>
            <Macronutrient keyId='4' number={carbohydrates}>Углеводы, г</Macronutrient>
        </ul>
    </div>)
}