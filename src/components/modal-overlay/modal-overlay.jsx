import s from "./modal-overlay.module.css"

export default function ModalOverlay({display, children}){
    return(display &&<section className={s.modal_overlay}>
        {children}
    </section>)
}