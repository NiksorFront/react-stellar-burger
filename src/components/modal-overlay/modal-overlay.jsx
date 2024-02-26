import s from "./modal-overlay.module.css"

export default function ModalOverlay({display, WindowModal}){
    return(display &&<section className={s.modal_overlay}>
        {WindowModal}
    </section>)
}