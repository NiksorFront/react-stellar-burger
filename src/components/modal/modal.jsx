import s from "./modal.module.css"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState, useEffect } from "react"

export default function Modal({content, openPopup}){
    useEffect(() => {
        //Закрытие по нажатию на esc
        const closeEsc = (e) => {e.keyCode === 27 
                             ? openPopup(false) 
                             : console.log("для закрытия нажмите esc")}
        document.addEventListener('keydown', closeEsc)
        
        //Устанавливаем закрытие по нажатию на тёмный фон.
        const closeBackgound = (e) => {e.target.tagName === 'SECTION' //Я решил не прокидвать портал и наржуать всё, а сделать просто сверку с тем section это или нет
                                        ? openPopup(false)
                                        : console.log("для закрытия нажмите на тёмный фон")}
        document.addEventListener('click', closeBackgound)
        
        return () => {document.removeEventListener('keydown', closeEsc); 
                      document.removeEventListener('click', closeBackgound)}
                      
    },[])

    //{content.popupContent.title}
    return(<div className={s.modal}>
        <div className={s.title}>
            <h3 className="text text_type_main-large">{content.title}</h3>
            <CloseIcon type="primary" onClick={() => openPopup(false)} />
        </div>
        {content.content}
    </div>)
}