import s from "./modal.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect, useRef} from "react"
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { Child, useDispatch} from "../../utils/prop-types";
import { popupOpen } from "../../services/Slice/modalSlice/modalSlice";
import { useNavigate } from "react-router-dom";

export default function Modal({children, title, pathURL}: Child & {title:string, pathURL: string}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const closeModal = () => {navigate(pathURL); dispatch(popupOpen(false));}

    useEffect(() => {
        const closeButton = document.getElementById('close');

        //Закрытие по нажатию на esc
        const closeEsc = (e: KeyboardEvent) => {e.key === "Escape" && closeButton!.click()}
        document.addEventListener('keydown', closeEsc)
        
        //Устанавливаем закрытие по нажатию на тёмный фон.
        const closeBackgound = (e: MouseEvent) => {(e.target as HTMLElement).tagName === 'SECTION' && closeButton!.click()}
        document.addEventListener('click', closeBackgound)
        
        return () => {document.removeEventListener('keydown', closeEsc); 
                      document.removeEventListener('click', closeBackgound)
                     }
    },[])
    

    return (createPortal((<ModalOverlay>  
        <div className={s.modal}>
            <div className={s.title}>
                <h1 className="text text_type_main-large">{title}</h1>
                <div id="close" data-cy="close" onClick={() => closeModal()}>
                    <CloseIcon type="primary" />
                </div>
            </div>
            {children}
        </div>
    </ModalOverlay>), document.getElementById("modals")!))
}