import s from "./burger-constructor.module.css"
import { ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import OrderDetails from "../order-details/order-details"


export default function BurgerConstructor({ingredients, popupSettings}){
    {/*Ниже высвечиваются вообще все компоненты, НО, я так понимаю, 
       в дальнешйем его релизация будет через общий с BurgerConstructor props*/}
    function Popup(){
        popupSettings.setPopupTrFal(true)
        popupSettings.setPopupCont({
            title:"",
            content: <OrderDetails />,
        })
    }
    return( <section className={s.brg_construct}>
                <div className={s.constructor}>
                    {ingredients.map(ingred => {return(
                        <ConstructorElement
                        key={ingred._id}
                        //type="top"
                        //type="bottom"
                        isLocked={true}
                        text={ingred.name}
                        price={ingred.price}
                        thumbnail={ingred.image_mobile}
                        />
                    )})}
                </div>
                <div className={s.info}>
                    <p className="text text_type_digits-medium">100</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={Popup} style={{alignSelf: 'end'}}>
                    Оформить заказ
                </Button>
            </section>
    )
}