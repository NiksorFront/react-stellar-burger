import s from "./modal-overlay.module.css"

export default function ModalOverlay({children}){
    return(<section className={s.modal_overlay}>
        {children}
    </section>)
}