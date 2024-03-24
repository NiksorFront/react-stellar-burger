import {useState, useMemo, useEffect} from 'react'
import s from './burger-ingredients.module.css'
import Ingredient from '../ingredient/ingredient'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice"

function NavIngred({current, setCurrent}){
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


    const [scrollPos, setScrollPos] = useState('one')
    const scroll = event => {
        const pos = event.currentTarget.scrollTop;

        (pos < 300) 
            ? setScrollPos("one")
        :(pos < 800)
            ? setScrollPos("two")
        : setScrollPos("three")
    }


    return(<section className={s.brg_ingredients}>
        <h2 className='text text_type_main-large mt-15'>Соберите бургер</h2>
        <NavIngred current={scrollPos} setCurrent={setScrollPos}/>
        <div className={s.Ingredients} onScroll={scroll}>
            <Ingredient ingredients={bun}  >Булки</Ingredient>
            <Ingredient ingredients={sauce}>Соусы</Ingredient>
            <Ingredient ingredients={main} >Начинка</Ingredient>
        </div>

    </section>
    )
}