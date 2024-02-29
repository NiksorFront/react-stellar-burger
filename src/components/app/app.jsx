import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { data } from "../../utils/data";
import request from "../api/API";
import AppHeader from "../app-header/app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal.jsx";

{/*На слуачай отсутствия интернета */}
const pseudo = {success: false, data: [{ "_id": "643d69a5c3f7b9001cfa093c",
                                          "name": "Краторная булка N-200i",
                                          "type": "bun",
                                          "proteins": 80,
                                          "fat": 24,
                                          "carbohydrates": 53,
                                          "calories": 420,
                                          "price": 1255,
                                          "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                                          "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                                          "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                                          "__v": 0
                                        },
                                        {
                                          "_id": "643d69a5c3f7b9001cfa0",
                                          "name": "Биокотлета из марсианской Магнолии",
                                          "type": "main",
                                          "proteins": 420,
                                          "fat": 142,
                                          "carbohydrates": 242,
                                          "calories": 4242,
                                          "price": 424,
                                          "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                                          "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                                          "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                                          "__v": 0
                                        },
                                        {
                                          "_id": "643d69a5c3f7b9001cfa0943",
                                          "name": "Соус фирменный Space Sauce",
                                          "type": "sauce",
                                          "proteins": 50,
                                          "fat": 22,
                                          "carbohydrates": 11,
                                          "calories": 14,
                                          "price": 80,
                                          "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                                          "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                                          "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                                          "__v": 0
                                        }]}

function App(){
  const [ingreds, setIngreds] = useState(pseudo);
  const [popupTrFal, setPopupTrFal] = useState(false);
  const [popupCont, setPopupCont] = useState({title: "",
                                              content: ""})
  
  const handleRequest = async() => {
    await request('ingredients')
    .then(res => setIngreds(res))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    handleRequest();
    //console.log(ingreds);
  }, [])


  return (
    <div className={styles.app}>
      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingreds.data} popupSettings={{setPopupTrFal, setPopupCont}}/>
        <BurgerConstructor ingredients={ingreds.data} popupSettings={{setPopupTrFal, setPopupCont}}/>
      </main>
      <Modal display={popupTrFal} openPopup={setPopupTrFal} title={popupCont.title}>
        {popupCont.content}{/*По сути тут отображается <OrderDetails /> или <IngredientDetails />*/}
      </Modal>
    </div>
  );
}

export default App;
