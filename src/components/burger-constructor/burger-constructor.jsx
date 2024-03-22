import s from "./burger-constructor.module.css"
import { ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from "../order-details/order-details"
import { useDispatch, useSelector } from "react-redux"
import { delIngred, addIngred} from '../../services/Slice/burgerConstructorSlice'
import { popupContent, popupOpen } from "../../services/Slice/modalSlice"
import { useDrop } from "react-dnd"
import { countIngreds } from "../../services/Slice/burgerIngredientsSlice"


export default function BurgerConstructor(){

    const ingreds = useSelector((state) => state.burgerIngredients.data) //Список с ваще всеми ингредиентами 
    const ingredients = useSelector(state => state.burgerConstructor)    //Список с теми ингредентами, что в BurgerConstructor
    const dispatch = useDispatch()

    const [{isHover}, dropTarget] = useDrop({accept:"component", 
                                             collect: monitor => ({isHover: monitor.isOver()}),
                                             drop(itemId){
                                                    ingreds.forEach((ingrd, index) => {
                                                        if (ingrd._id === itemId.id) {
                                                            if(ingrd.type === 'bun'){      //Проверяем булочка ли сейчас
                                                                ingreds.forEach((item, i) => { //Удаляем предыдущую, если она есть
                                                                    if (item.__v === 1 && item.type === "bun") {       
                                                                        dispatch(countIngreds([i, 0]))  //Cчётчик в ноль
                                                                        dispatch(delIngred(-1))
                                                                        dispatch(delIngred(0)) 
                                                                    }
                                                                })
                                                                dispatch(countIngreds([index, 1]))   //+1 к счётчику
                                                                dispatch(addIngred([ingrd, 0]))      //Добаляем перенесённый объект в ingredients
                                                                dispatch(addIngred([ingrd, ingredients.length]))
                                                            }//Всё, что не булочки - спокойно добавляем
                                                            else{
                                                                const count = ingrd.__v + 1
                                                                dispatch(countIngreds([index, count]))   //Меняем значение счётчика
                                                                dispatch(addIngred([ingrd, 1]))          //Добаляем перенесённый объект в ingredients
                                                            }
                                                        }

                                                    })
                                                }
                                           })

    
    {/*Ниже высвечиваются вообще все компоненты, НО, я так понимаю, 
       в дальнешйем его релизация будет через общий с BurgerConstructor props*/}
    function Popup(){
        dispatch(popupOpen(true))
        dispatch(popupContent({
            title:"",
            content: <OrderDetails />,
        }))
    }

    function deleteElement(id, index){
        ingreds.forEach((ingrd, i) => {
            if (ingrd._id === id) {
                if (ingrd.type === "bun"){
                    dispatch(countIngreds([i, 0]))  //Cчётчик в ноль
                    dispatch(delIngred(0))          
                    dispatch(delIngred(-1))
                }else{
                    const count = ingrd.__v - 1
                    dispatch(countIngreds([i, count]))  //Меняем значение счётчика
                    dispatch(delIngred(index))          //Удаляем объект из ingredients
                }
            }

        })                                            
    }

    let e = 0;                      //Счётчик элементов
    const len = ingredients.length; //Количество всех элементов
    return( <section className={s.brg_construct}
                     ref={dropTarget}
                     style={{borderColor: isHover ? "rgba(254, 36, 232, 1)"   //Если предмет в границах блока, то прозрачности рамки нет,
                                                  : "rgba(254, 36, 232, 0)"}} //Если предмет не в границах блока, то рамка прозрачна 
                    >
                <div className={s.constructor}>
                    {ingredients.map((ingred, index) => {
                        e += 1;
                        return(
                            <ConstructorElement
                                key={ingred._id}
                                isLocked={false}
                                type={e === 1   ? "top" :    //Каждому первому элементу указываем, что он "top"
                                    e === len && "bottom"} //Кажому последнему указываем, что он "bottom"     
                                text={ingred.name}
                                price={ingred.price}
                                thumbnail={ingred.image_mobile}
                                handleClose={()=>deleteElement(ingred._id, index)}
                            />
                        )}
                    )}
                </div>
                <div className={s.info}>
                    <p className="text text_type_digits-medium">100</p>
                    <CurrencyIcon type="primary" />
                
                    <Button htmlType="button" type="primary" size="large" onClick={Popup} style={{alignSelf: 'end'}}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
    )
}