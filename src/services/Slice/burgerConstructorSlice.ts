import {createSlice} from "@reduxjs/toolkit"
import { IngredientType } from "../../utils/prop-types";

const initialState: Array<IngredientType> = [];

type add = {payload: [IngredientType, number]} 
type del = {payload: number}
type replace = {payload: [number,number]}

//список всех полученных ингредиентов
export const burgerConstructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
      addIngred: (state, {payload: [ingredient, index]}: add) => {state.splice(index, 0, ingredient);},
      delIngred: (state, {payload: index}: del) => {state.splice(index, 1);}, 
      repIngred: (state, {payload: [indexOld, indexNew]}: replace) => {const itemOld: IngredientType = state[indexOld];
                                                                       const itemNew: IngredientType = state[indexNew];
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