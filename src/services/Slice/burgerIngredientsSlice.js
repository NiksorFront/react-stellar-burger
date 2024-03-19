import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import request from "../../components/api/API";

const initialState = {success: false, data: []}

export const requestСomponents = createAsyncThunk(
  'BurgerIngredients/requestData',
  async () => {
    const itog = await request('ingredients')
                       .then(res => res)
                       .catch(err => console.log(err));

    return itog;
})


//список всех полученных ингредиентов
export const BurgerIngredientsSlice = createSlice({
    name: 'BurgerIngredients',
    initialState,
    reducers: {
      incrementByValue: (state, action) => state + action.payload,
    },
    extraReducers: (builder) => {
      builder.addCase(requestСomponents.pending, () => console.log("Ждём данные с сервера"));//загрузка

      builder.addCase(requestСomponents.fulfilled,                                           //Всё отлично
                      (state, action) => {state.success = action.payload.success
                                          state.data = action.payload.data      }); 

      //builder.addCase(handleRequest.rejected, (state, action) => {})                       //ошибка
    }
  }) 

  
const burgerIngredients = BurgerIngredientsSlice.reducer;
export default burgerIngredients;