import {useState, useMemo} from 'react'
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


function lol(ingredients) {
    const [mains, buns, sauces] = [[],[],[]]

    ingredients.forEach(ingred => {
    ingred.type === 'bun'   ? buns.push(ingred)  :
    ingred.type === 'main'  ? mains.push(ingred) :
    ingred.type === 'sauce' ? sauces.push(ingred): console.log("Нужный тип не найден");

    console.log("лол")
    return [[]]
})}

function values(ingredients){
    const [main_, bun_, sauce_] = [[],[],[]]

    ingredients.forEach(ingred => {
        ingred.type === 'bun'   ? bun_.push(ingred)  :
        ingred.type === 'main'  ? main_.push(ingred) :
        ingred.type === 'sauce' && sauce_.push(ingred)})

    return [bun_, main_, sauce_]
}

export default function BurgerIngredients({ingredients, popupSettings}){
    {/*Ниже по соответствующим массивам распределяем игредиенты*/}
    const [bun, main, sauce] = useMemo(() => values(ingredients), ingredients)


    return(<section className={s.brg_ingredients}>
        <h2 className='text text_type_main-large mt-15'>Соберите бургер</h2>
        <NavIngred/>
        <div className={s.Ingredients}>
            <Ingredient ingredients={bun}   popupSettings={popupSettings}>Булки</Ingredient>
            <Ingredient ingredients={sauce} popupSettings={popupSettings}>Соусы</Ingredient>
            <Ingredient ingredients={main}  popupSettings={popupSettings}>Начинка</Ingredient>
        </div>

    </section>
    )
}