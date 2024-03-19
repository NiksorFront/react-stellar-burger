import {useState, useMemo, useEffect} from 'react'
import s from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice"

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


function values(ingredients){
    const [main_, bun_, sauce_] = [[],[],[]]

    ingredients.forEach(ingred => {
        ingred.type === 'bun'   ? bun_.push(ingred)  :
        ingred.type === 'main'  ? main_.push(ingred) :
        ingred.type === 'sauce' && sauce_.push(ingred)})

    return [bun_, main_, sauce_]
}

export default function BurgerIngredients(){
    const ingreds = useSelector((state) => state.burgerIngredients)
    const dispatch = useDispatch();
    {/*Ниже по соответствующим массивам распределяем игредиенты*/}
    //const [bun, main, sauce] = useMemo(() => values(ingredients), ingredients)
    const [bun, main, sauce] = values(ingreds.data);

    useEffect(() => {
        dispatch(requestСomponents()) //Запрашиваем и получаем список компонентов с сервера
    }, [])

    return(<section className={s.brg_ingredients}>
        <h2 className='text text_type_main-large mt-15'>Соберите бургер</h2>
        <NavIngred/>
        <div className={s.Ingredients}>
            <Ingredient ingredients={bun}  >Булки</Ingredient>
            <Ingredient ingredients={sauce}>Соусы</Ingredient>
            <Ingredient ingredients={main} >Начинка</Ingredient>
        </div>

    </section>
    )
}