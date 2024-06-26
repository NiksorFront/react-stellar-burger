import s from "./burger-constructor.module.css"
import { ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import { v4 as uuidv4 } from "uuid";
import { IngredientType, useDispatch, useSelector } from "../../utils/prop-types"
import { delIngred, addIngred, repIngred} from '../../services/Slice/burgerConstructorSlice'
import { popupContent, popupOpen } from "../../services/Slice/modalSlice"
import { useDrag, useDrop } from "react-dnd"
import { countIngreds } from "../../services/Slice/burgerIngredientsSlice"
import { useMemo, useRef } from "react"
import { reqOrder } from "../../services/Slice/orderSlice/orderSlice" 
import { useNavigate } from "react-router-dom";
import { updateDataProfile } from "../../services/Slice/profileSlice";
import { getCookie } from "../../utils/cookie";

type ingrInCnstrType = {ingred: IngredientType, index: number, len: number, e: number, deleteElement: any}

function IngrInConstructor({ingred, index, len, e, deleteElement}:ingrInCnstrType){ 
    const dispatch = useDispatch()

    const [{isDraging},dragIng] = useDrag({type:"ingredients",
                                           item:{index: index},
                                           collect: monitor => ({isDraging: monitor.isDragging()})
                                        })

    {/*Функционал перетаскивания ингредиентов внутри BurgerConstructor*/}
    const [{isHover},dropIng] = useDrop({accept: "ingredients",
                                         collect: monitor => ({isHover: monitor.isOver()}),
                                         drop(item: {index: number}){
                                            dispatch(repIngred([item.index, index]))
                                         },
                                       })
    
    return(<div ref={(ingred.type === "bun") ? undefined : dragIng}>
                <div ref={(ingred.type === "bun") ? undefined : dropIng}
                    className={`${s.ingredient}
                                ${isHover && s.ingredient_gradient}
                                ${isDraging && s.ingredient_opacity}` 
                                //isHover - Если предмет в границах блока, то на фоне градиентик
                                //isDraging - Делаем элемент полупрозрачным при перетаскивании
                            }                    
                >   
                    {e === 1   ? <p className={s.dummy}>000</p> :            //Каждому первому элементу указываем, что он "top"
                     e === len ? <p className={s.dummy}>000</p> : <DragIcon type="primary" />}
                    <ConstructorElement
                        isLocked={e === 1   ? true :    
                                e === len && true}
                        type={e === 1   ? "top" :            //Каждому первому элементу указываем, что он "top"
                            e === len ? "bottom": undefined} //Кажому последнему указываем, что он "bottom"     
                        text={e === 1   ? ingred.name+" (верх)":    
                            e === len ? ingred.name+" (низ)" : ingred.name}
                        price={ingred.price}
                        thumbnail={ingred.image_mobile}
                        handleClose={()=>deleteElement(ingred._id, index)}
                    />
                </div>
           </div>
    )
}

export default function BurgerConstructor(){

    const ingreds = useSelector(state => state.burgerIngredients.data) //Список с ваще всеми ингредиентами 
    const ingredients = useSelector(state => state.burgerConstructor)    //Список с теми ингредентами, что в BurgerConstructor
    const dispatch = useDispatch();
    const navigate = useNavigate();


    {/*Функционал удаления элемента*/}
    function deleteElement(id:string, index:number){
        ingreds.forEach((ingrd: IngredientType, i:number) => {
            if (ingrd._id === id) {
                if (ingrd.type === "bun"){
                    dispatch(countIngreds([i, 0]))      //Cчётчик в ноль
                    dispatch(delIngred(ingredients.length-1))
                    dispatch(delIngred(0))          
                }else{
                    const count = ingrd.__v - 1
                    dispatch(countIngreds([i, count]))  //Меняем значение счётчика
                    dispatch(delIngred(index))          //Удаляем объект из ingredients
                }
            }

        })
    }


    {/*Функционал бросания элмента*/}

    function isDrop(itemId: string){
        ingreds.forEach((ingredient, index) => {
            const ingrd = {
                ...ingredient,
                uniqueId: uuidv4(), //Не ingred._id, потому что одинаковых эллементов может бвть много, а key должен быть всегда разный
            }
                        
            if (ingrd._id === itemId) {
                if(ingrd.type === 'bun'){      //Проверяем булочка ли сейчас
                    ingreds.forEach((item, i) => { //Удаляем предыдущую, если она есть
                        if (item.__v === 1 && item.type === "bun") {       
                            dispatch(countIngreds([i, 0]))  //Cчётчик в ноль
                            dispatch(delIngred(ingredients.length-1))
                            dispatch(delIngred(0)) 
                        }
                    })
                    dispatch(countIngreds([index, 1]))   //+1 к счётчику
                    dispatch(addIngred([ingrd, 0]))      //Добаляем перенесённый объект в ingredients
                    dispatch(addIngred([{...ingrd, uniqueId: uuidv4()}, ingredients.length+1]))
                }//Всё, что не булочки - спокойно добавляем
                else{
                    const count = ingrd.__v + 1
                    dispatch(countIngreds([index, count]))   //Меняем значение счётчика
                    dispatch(addIngred([ingrd, 1]))          //Добаляем перенесённый объект в ingredients
                }
            }

        })
    }

    const [{isHover}, dropTarget] = useDrop({accept:"component", 
                                             collect: monitor => ({isHover: monitor.isOver()}),
                                             drop(itemId: {id: string}){
                                                isDrop(itemId.id)
                                             }
                                           })

    
    const isAuth = useSelector(state => state.profile.isAuth)
    {/*Функционал окна с оформленным заказом*/}
    async function popup(){
        dispatch(updateDataProfile(dispatch)) //Обновляем хранилище данными с сервера
        if(isAuth){
            dispatch(popupOpen(true))
            dispatch(popupContent({
                title:"",
                modal: "OrderDetails",
            }));
            const token: string = getCookie('accessToken')!
            const endpoint = `orders?token=${token.split(" ")[1]}`
            dispatch(reqOrder([ingredients.map(ing => ing._id), endpoint])) //Запрашиваем данные с номером заказа
        }else{
            navigate("/login")
        }
    }
    
    let e: number = 0;                      //Счётчик элементов
    const len: number = ingredients.length; //Количество всех элементов
    let totalPrice: number = useMemo(() => {return ingredients.reduce((Summa, ingrd) => Summa + ingrd.price, 0)}, [len]); //Общая цена
    return( <section className={`${s.brg_construct}
                                ${isHover && s.brg_construct_opacity}`}//Если предмет в границах блока, то прозрачности рамки нет,
                     ref={dropTarget}>
                <div className={`${s.constructor}`}>
                    {ingredients.map((ingred, index) => {
                        e += 1;
                        return <IngrInConstructor key={ingred.uniqueId} ingred={ingred} index={index} e={e} len={len} deleteElement={deleteElement}/>
                    })}
                </div>
                <div className={s.info}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                    
                    <Button htmlType="button" type="primary" disabled={!len} size="large" onClick={popup}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
    )
}