import { combineReducers } from "@reduxjs/toolkit";
import burgerIngredients from "./Slice/burgerIngredientsSlice";
import burgerConstructor from "./Slice/burgerConstructorSlice";
import modal from "./Slice/modalSlice"

const initialState = {
    ingredients: {}, //список всех полученных ингредиентов
    currentIngreds: {}, //список всех ингредиентов в текущем конструкторе бургера
    ingred: {},  //объект текущего просматриваемого ингредиента
    order: {}  //объект созданного заказа
}

export const rootReducer = combineReducers({burgerIngredients, burgerConstructor, modal})   