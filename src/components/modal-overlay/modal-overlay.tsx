import { ReactNode } from "react"
import s from "./modal-overlay.module.css"
import { Child } from "../../utils/prop-types"



export default function ModalOverlay({children}:Child){
    return(<section className={s.modal_overlay}>
        {children}
    </section>)
}