import s from "./ingredient-details.module.css"

function Macronutrient({keyId, number, children}){
    return (<li key={keyId} style={{color: "rgba(133, 133, 173, 1)"}}>
                <p className="text text_type_main-small text_color_inactive">{children}</p>
                <p className="text text_type_digits-default text_color_inactive">{number}</p>
            </li>)
}

export default function IngredientDetails({imageURL, title, calories, proteins, fats, carbohydrates}){
    return(<div className={s.cntent}>
        <img src={imageURL} className={s.img}/> 
        <h3 className="text text_type_main-medium mt-4">{title}</h3>
        <ul className={s.macronutrients}>
            <Macronutrient keyId={1} number={calories}>Калории, ккал</Macronutrient>
            <Macronutrient keyId={2} number={proteins}>Белки, г</Macronutrient>
            <Macronutrient keyId={3} number={fats}>Жиры, г</Macronutrient>
            <Macronutrient keyId={4} number={carbohydrates}>Углеводы, г</Macronutrient>
        </ul>
    </div>)
}