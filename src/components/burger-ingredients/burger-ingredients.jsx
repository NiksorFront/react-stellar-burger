import React, {useState} from 'react'
import s from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function NavIngred(){
    const [current, setCurrent] = useState('one')

    return(
        <div style={{ display: 'flex' }} className="mt-5">
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Three
            </Tab>
        </div>
    )
}



export default function BurgerIngredients(ingredients){
    {/*Ниже по соответствующим массивам распределяем игредиенты*/}
    const [main, bun, sauce] = [[],[],[]]
    ingredients.ingreds.forEach(ingred => {
        ingred.type === 'bun'   ? bun.push(ingred)  :
        ingred.type === 'main'  ? main.push(ingred) :
        ingred.type === 'sauce' ? sauce.push(ingred): console.log("Нужный тип не найден")
    })

    //console.log(main, bun, sauce)

    return(<section className={s.brg_ingredients}>
        <h2 className='text text_type_main-large mt-15'>Соберите бургер</h2>
        <NavIngred/>
        <div className={s.Ingredients}>
            <Ingredient ingredients={bun}>Булки</Ingredient>
            <Ingredient ingredients={sauce}>Соусы</Ingredient>
            <Ingredient ingredients={main}>Начинка</Ingredient>
        </div>

    </section>
    )
}