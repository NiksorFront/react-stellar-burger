import {useState, useMemo, useEffect} from 'react'
import s from './burger-ingredients.module.css'
import IngredientList from '../ingredient-list/ingredient-list'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch, IngredientType } from '../../utils/prop-types'
import {requestСomponents} from "../../services/Slice/burgerIngredientsSlice"


type navTypes = {current: string, setCurrent: React.Dispatch<React.SetStateAction<string>>}

function NavIngred({current, setCurrent}:navTypes){
    return(
        <div style={{ display: 'flex' }} className="mt-5">
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}


type valueType = [main_: IngredientType[], 
                  bun_:  IngredientType[], 
                  sauce_:IngredientType[]]

function values(ingredients: Array<IngredientType>){
    const [main_, bun_, sauce_]:valueType = [[],[],[]]

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
    const scroll = (event: React.UIEvent<HTMLElement>) => {
        const pos = event.currentTarget.scrollTop;

        (pos < 300) 
            ? setScrollPos("one")
        :(pos < 800)
            ? setScrollPos("two")
        : setScrollPos("three")
    }


    return(<section className={s.brg_ingredients}>
        <h2 className='text text_type_main-large mt-10'>Соберите бургер</h2>
        <NavIngred current={scrollPos} setCurrent={setScrollPos}/>
        <div className={s.Ingredients} onScroll={scroll}>
            <IngredientList ingredients={bun}  >Булки</IngredientList>
            <IngredientList ingredients={sauce}>Соусы</IngredientList>
            <IngredientList ingredients={main} >Начинка</IngredientList>
        </div>

    </section>
    )
}