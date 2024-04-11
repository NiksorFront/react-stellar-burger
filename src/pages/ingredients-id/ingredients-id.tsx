import s from "./ingredients-id.module.css"
import IngredientDetails from "../../components/ingredient-details/ingredient-details";


export default function IngredientsId(){
    return(<div className={s.form}>
        <h1 className="text text_type_main-large mt-20 mb-5">Детали ингридиента</h1>
        <IngredientDetails />
    </div>)
}