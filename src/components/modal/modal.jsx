import s from "./modal.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect} from "react"
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch, useSelector} from "react-redux";
import { popupOpen } from "../../services/Slice/modalSlice";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

export default function Modal(){
    const popupTitle = useSelector(state => state.modal.data.title)
    const popupModal = useSelector(state => state.modal.data.modal)
    const popupContent = useSelector(state => state.modal.data.content)

    const dispatch = useDispatch();

    const closeModal = () => dispatch(popupOpen(false))

    const ESC_KEY_CODE = 27;
    useEffect(() => {
        //Закрытие по нажатию на esc
        const closeEsc = (e) => {e.keyCode === ESC_KEY_CODE && closeModal()}
        document.addEventListener('keydown', closeEsc)
        
        //Устанавливаем закрытие по нажатию на тёмный фон.
        const closeBackgound = (e) => {e.target.tagName === 'SECTION' && closeModal()}
        document.addEventListener('click', closeBackgound)
        
        return () => {document.removeEventListener('keydown', closeEsc); 
                      document.removeEventListener('click', closeBackgound)}
                      
    },[])

    return createPortal((<ModalOverlay>  
        <div className={s.modal}>
            <div className={s.title}>
                <h1 className="text text_type_main-large">{popupTitle}</h1>
                <CloseIcon type="primary" onClick={() => closeModal()} />
            </div>
            {popupModal==="OrderDetails"      && <OrderDetails />}
            {popupModal==="IngredientDetails" && <IngredientDetails imageURL  =   {popupContent.image_large}  
                                                                    title     =   {popupContent.name}
                                                                    calories  =   {popupContent.calories} 
                                                                    proteins  =   {popupContent.proteins} 
                                                                    fats      =   {popupContent.fat} 
                                                                    carbohydrates={popupContent.carbohydrates}/>}
        </div>
    </ModalOverlay>), document.getElementById("modals"))
}