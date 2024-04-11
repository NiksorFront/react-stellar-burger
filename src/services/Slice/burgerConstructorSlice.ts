import {createSlice} from "@reduxjs/toolkit"
import { ingredientType } from "../../utils/prop-types";

const initialState: Array<ingredientType> = [];

type add = {payload: [ingredientType, number]} 
type del = {payload: number}
type replace = {payload: [number,number]}

//список всех полученных ингредиентов
export const burgerConstructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
      addIngred: (state, {payload: [ingredient, index]}: add) => {state.splice(index, 0, ingredient);},
      delIngred: (state, {payload: index}: del) => {state.splice(index, 1);}, 
      repIngred: (state, {payload: [indexOld, indexNew]}: replace) => {const itemOld: ingredientType = state[indexOld];
                                                                       const itemNew: ingredientType = state[indexNew];
                                                                       state.splice(indexNew, 1, itemOld);
                                                                       state.splice(indexOld, 1, itemNew);
                                                                      }
    },
  }) 

export const addIngred = burgerConstructorSlice.actions.addIngred;
export const delIngred = burgerConstructorSlice.actions.delIngred;
export const repIngred = burgerConstructorSlice.actions.repIngred;

const burgerConstructor = burgerConstructorSlice.reducer;
export default burgerConstructor;