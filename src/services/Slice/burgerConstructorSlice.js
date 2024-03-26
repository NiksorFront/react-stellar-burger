import {createSlice} from "@reduxjs/toolkit"

const initialState = [];

//список всех полученных ингредиентов
export const burgerConstructorSlice = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
      addIngred: (state, {payload: [ingredient, index]}) => {state.splice(index, 0, ingredient);},
      delIngred: (state, {payload: index}) => {state.splice(index, 1) }, 
      repIngred: (state, {payload: [indexOld, indexNew]}) => {const itemOld = state[indexOld];
                                                                      const itemNew = state[indexNew];
                                                                      state.splice(indexNew, 1, itemOld);
                                                                      state.splice(indexOld, 1, itemNew);
                                                                    }
      // state.push(action.payload)
    },
  }) 

//allIngredientsSlice.actions

export const addIngred = burgerConstructorSlice.actions.addIngred;
export const delIngred = burgerConstructorSlice.actions.delIngred;
export const repIngred = burgerConstructorSlice.actions.repIngred;

const burgerConstructor = burgerConstructorSlice.reducer;
export default burgerConstructor;