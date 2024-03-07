import s from "./modal.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect} from "react"
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({display, openPopup, title, children}){
    const ESC_KEY_CODE = 27;

    useEffect(() => {
        //Закрытие по нажатию на esc
        const closeEsc = (e) => {e.keyCode === ESC_KEY_CODE && openPopup(false)}
        document.addEventListener('keydown', closeEsc)
        
        //Устанавливаем закрытие по нажатию на тёмный фон.
        const closeBackgound = (e) => {e.target.tagName === 'SECTION' && openPopup(false)} //Я решил не прокидвать портал и наржуать всё, а сделать просто сверку с тем section это или нет
        document.addEventListener('click', closeBackgound)
        
        return () => {document.removeEventListener('keydown', closeEsc); 
                      document.removeEventListener('click', closeBackgound)}
                      
    },[])

    return createPortal((<ModalOverlay display={display}>  
        <div className={s.modal}>
            <div className={s.title}>
                <h1 className="text text_type_main-large">{title}</h1>
                <CloseIcon type="primary" onClick={() => openPopup(false)} />
            </div>
            {children}
        </div>
    </ModalOverlay>), document.body)
}