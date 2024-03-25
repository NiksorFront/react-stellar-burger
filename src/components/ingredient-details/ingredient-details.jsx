import { useSelector } from "react-redux"
import s from "./ingredient-details.module.css"

function Macronutrient({keyId, number, children}){
    return (<li key={keyId} style={{color: "rgba(133, 133, 173, 1)"}}>
                <p className="text text_type_main-small text_color_inactive">{children}</p>
                <p className="text text_type_digits-default text_color_inactive">{number}</p>
            </li>)
}

export default function IngredientDetails(){
    const {image_large: imageURL, name, calories, proteins, fat, carbohydrates} = useSelector(state => state.modal.data.content);

    return(<div className={s.cntent}>
        <img src={imageURL} className={s.img}/> 
        <h3 className="text text_type_main-medium mt-4">{name}</h3>
        <ul className={s.macronutrients}>
            <Macronutrient keyId={1} number={calories}>Калории, ккал</Macronutrient>
            <Macronutrient keyId={2} number={proteins}>Белки, г</Macronutrient>
            <Macronutrient keyId={3} number={fat}>Жиры, г</Macronutrient>
            <Macronutrient keyId={4} number={carbohydrates}>Углеводы, г</Macronutrient>
        </ul>
    </div>)
}