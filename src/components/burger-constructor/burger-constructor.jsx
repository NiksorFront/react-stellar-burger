import s from "./burger-constructor.module.css"
import { ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux"
import { delIngred, addIngred, repIngred} from '../../services/Slice/burgerConstructorSlice'
import { popupContent, popupOpen } from "../../services/Slice/modalSlice"
import { useDrag, useDrop } from "react-dnd"
import { countIngreds } from "../../services/Slice/burgerIngredientsSlice"
import { useMemo, useRef } from "react"
import { reqOrder } from "../../services/Slice/orderSlice"


function IngrInConstructor({ingred, index, len, e, deleteElement}){ 
    const dispatch = useDispatch()

    const [{isDraging},dragIng] = useDrag({type:"ingredients",
                                           item:{index: index},
                                           collect: monitor => ({isDraging: monitor.isDragging()})
                                        })

    {/*Функционал перетаскивания ингредиентов внутри BurgerConstructor*/}
    const [{isHover},dropIng] = useDrop({accept: "ingredients",
                                         collect: monitor => ({isHover: monitor.isOver()}),
                                         drop(item){
                                            dispatch(repIngred([item.index, index]))
                                         },
                                       })
    
    const refBun = useRef() //Его перетаскивать нельзя

    const ref = useRef(null); 
    const dragDropRef = dragIng(dropIng(ref))
    
    return(<div ref={(ingred.type === "bun") ? refBun : dragDropRef}
                className={`${s.ingredient}
                            ${isHover && s.ingredient_gradient}
                            ${isDraging && s.ingredient_opacity}` 
                            //isHover - Если предмет в границах блока, то на фоне градиентик
                            //isDraging - Делаем элемент полупрозрачным при перетаскивании
                          }                    
            >
                <ConstructorElement
                    isLocked={e === 1   ? true :    
                              e === len && true}
                    type={e === 1   ? "top" :    //Каждому первому элементу указываем, что он "top"
                          e === len && "bottom"} //Кажому последнему указываем, что он "bottom"     
                    text={e === 1   ? ingred.name+" (верх)":    
                          e === len ? ingred.name+" (низ)" : ingred.name}
                    price={ingred.price}
                    thumbnail={ingred.image_mobile}
                    handleClose={()=>deleteElement(ingred._id, index)}
                />
           </div>
    )
}

export default function BurgerConstructor(){

    const ingreds = useSelector((state) => state.burgerIngredients.data) //Список с ваще всеми ингредиентами 
    const ingredients = useSelector(state => state.burgerConstructor)    //Список с теми ингредентами, что в BurgerConstructor
    const dispatch = useDispatch()


    {/*Функционал удаления элемента*/}
    function deleteElement(id, index){
        ingreds.forEach((ingrd, i) => {
            if (ingrd._id === id) {
                if (ingrd.type === "bun"){
                    console.log(1)
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


    {/*Функционал бросания элмента */}
    function isDrop(itemId){
        ingreds.forEach((ingrd, index) => {
            if (ingrd._id === itemId.id) {
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
                    dispatch(addIngred([ingrd, ingredients.length+1]))
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
                                             drop(itemId){isDrop(itemId)}
                                           })


    {/*Функционал окна с оформленным заказом*/}
    function popup(){
        dispatch(popupOpen(true))
        dispatch(popupContent({
            title:"",
            modal: "OrderDetails",
        }))
        dispatch(reqOrder([ingredients.map(ing => ing._id), 'orders'])) //Запрашиваем данные с номером заказа
    }
    
    let e = 0;                      //Счётчик элементов
    const len = ingredients.length; //Количество всех элементов
    let totalPrice = useMemo(() => {return ingredients.reduce((Summa, ingrd) => Summa + ingrd.price, 0)}, [len]); //Общая цена
    return( <section className={`${s.brg_construct}
                                ${isHover && s.brg_construct_opacity}`}//Если предмет в границах блока, то прозрачности рамки нет,
                     ref={dropTarget}>
                <div className={s.constructor}>
                    {ingredients.map((ingred, index) => {
                        const uniqueId = uuidv4(); //Не ingred._id, потому что одинаковых эллементов может бвть много, а key должен быть всегда разный
                        e += 1;
                        return <IngrInConstructor key={uniqueId} ingred={ingred} index={index} e={e} len={len} deleteElement={deleteElement}/>
                    })}
                </div>
                <div className={s.info}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                
                    <Button htmlType="button" type="primary" size="large" onClick={len && popup} style={{alignSelf: 'end'}}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
    )
}