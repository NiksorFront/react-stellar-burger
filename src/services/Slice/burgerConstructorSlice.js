import {createSlice} from "@reduxjs/toolkit"

const initialState = [];

//список всех полученных ингредиентов
export const burgerConstructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
      addIngredient: (state, {payload: [ingredient, index]}) => {state.splice(index, 0, ingredient);},
      deleteIngredient: (state, {payload: index}) => {state.splice(index, 1) }
      // state.push(action.payload)
    },
  }) 

//allIngredientsSlice.actions

export const addIngred = burgerConstructorSlice.actions.addIngredient;
export const delIngred = burgerConstructorSlice.actions.deleteIngredient;

const burgerConstructor = burgerConstructorSlice.reducer;
export default burgerConstructor;