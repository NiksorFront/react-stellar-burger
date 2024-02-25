import React from "react"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import s from "./ingredient.module.css"

export default function Ingredient({children, ingredients}){
    ingredients.forEach(ingr => console.log(ingr))
    console.log('\n')

    const count = "";

    return(<div>
        <h4 className='text text_type_main-medium mt-15'>{children}</h4>
        <ul className={s.columns}>
            {ingredients.map(ingr => {return(
            <li className={s.column}>
                {/*count тут*/}
                {count && <Counter count={count} size="default" extraClass="m-1" />}
                <img src={ingr.image} alt="Хер" className={s.img}/>
                <div className={s.price}>
                    <p className="text text_type_digits-default">{ingr.price}</p>
                    <CurrencyIcon/>
                </div>
                <p className="text text_type_main-default">{ingr.name}</p>
            </li>)})}
        </ul>
    </div>)
}