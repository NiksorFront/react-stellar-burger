import { combineReducers } from "@reduxjs/toolkit";
import burgerIngredients from "./Slice/burgerIngredientsSlice/BurgerIngredientsSlice"; //список всех полученных ингредиентов
import burgerConstructor from "./Slice/burgerConstructorSlice/burgerConstructorSlice"; //список всех ингредиентов в текущем конструкторе бургера
import modal from "./Slice/modalSlice/modalSlice"                          //объект текущего просматриваемого ингредиента
import order from "./Slice/orderSlice/orderSlice";                         //объект созданного заказа
import profile from "./Slice/profileSlice/profileSlice";                     //Данные пользователя, всякие регистрации, аунтентификации и всё с этим связанное
import { orderReducer } from "./Slice/orderSlice/orderReducers";



export const rootReducer = combineReducers({burgerIngredients, burgerConstructor, modal, order, profile, orderReducer})   