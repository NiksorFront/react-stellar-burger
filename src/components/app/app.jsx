import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal.jsx";
import { useSelector } from "react-redux";


function App(){
  const popupTrueFalse = useSelector(state => state.modal.open)
 
  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      {popupTrueFalse && <Modal>
        {/*По сути тут отображается <OrderDetails /> или <IngredientDetails />*/}
      </Modal>}
    </div>
  );
}

export default App;
