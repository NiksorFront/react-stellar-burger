 import { useEffect, useState } from "react";
import styles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import { useSelector } from "../../utils/prop-types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";


function App(){
  const popupTrueFalse = useSelector(state => state.modal.open)
  const popupTitle = useSelector(state => state.modal.data.title)
  const popupModal = useSelector(state => state.modal.data.modal)

  return (
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        <div className={styles.app}>
          {popupTrueFalse && <Modal title={popupTitle} pathURL={"/"}>
            {popupModal==="OrderDetails"      && <OrderDetails />}
            {popupModal==="IngredientDetails" && <IngredientDetails />}
          </Modal>}
        </div>
      </main>
  );
}

export default App;
