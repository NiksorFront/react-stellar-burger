import { combineReducers } from "@reduxjs/toolkit";
import burgerIngredients from "./Slice/burgerIngredientsSlice"; //список всех полученных ингредиентов
import burgerConstructor from "./Slice/burgerConstructorSlice"; //список всех ингредиентов в текущем конструкторе бургера
import modal from "./Slice/modalSlice"                          //объект текущего просматриваемого ингредиента
import order from "./Slice/orderSlice";                         //объект созданного заказа



export const rootReducer = combineReducers({burgerIngredients, burgerConstructor, modal, order})   