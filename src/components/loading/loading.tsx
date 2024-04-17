import s from "./loading.module.css"

export default function Loading(){
    return(<div className={s.loading}>
        <p className="text text_type_main-large">Идёт загрузка</p>
    </div>)
}