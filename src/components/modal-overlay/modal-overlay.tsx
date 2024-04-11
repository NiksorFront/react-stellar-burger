import { ReactNode } from "react"
import s from "./modal-overlay.module.css"
import { child } from "../../utils/prop-types"



export default function ModalOverlay({children}:child){
    return(<section className={s.modal_overlay}>
        {children}
    </section>)
}