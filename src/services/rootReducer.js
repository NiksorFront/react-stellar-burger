import { combineReducers } from "@reduxjs/toolkit";
import burgerIngredients from "./Slice/burgerIngredientsSlice"; //список всех полученных ингредиентов
import burgerConstructor from "./Slice/burgerConstructorSlice"; //список всех ингредиентов в текущем конструкторе бургера
import modal from "./Slice/modalSlice"                          //объект текущего просматриваемого ингредиента
import order from "./Slice/orderSlice";                         //объект созданного заказа
import profile from "./Slice/profileSlice";                     //Данные пользователя, всякие регистрации, аунтентификации и всё с этим связанное



export const rootReducer = combineReducers({burgerIngredients, burgerConstructor, modal, order, profile})   