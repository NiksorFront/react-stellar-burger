import s from "./modal.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect} from "react"
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch} from "react-redux";
import { popupOpen } from "../../services/Slice/modalSlice";
import { useNavigate } from "react-router-dom";

export default function Modal({children, title}){
    const dispatch = useDispatch();
    const navigate = useNavigate()

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
                      document.removeEventListener('click', closeBackgound)
                      navigate("/", {replace:true})}
    },[])

    return createPortal((<ModalOverlay>  
        <div className={s.modal}>
            <div className={s.title}>
                <h1 className="text text_type_main-large">{title}</h1>
                <CloseIcon type="primary" onClick={() => closeModal()} />
            </div>
            {children}
        </div>
    </ModalOverlay>), document.getElementById("modals"))
}