import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {request} from "../../utils/API";

const initialState = {success: false, data: []}

export const requestСomponents = createAsyncThunk(
  'BurgerIngredients/requestData',
  () => {const result = request('ingredients')
                        .then(res => res)

         return result;
        }
)


//список всех полученных ингредиентов
export const BurgerIngredientsSlice = createSlice({
    name: 'BurgerIngredients',
    initialState,
    reducers: {
      countIngreds: (state, {payload: [index, cnt]}) => {state.data[index].__v = cnt},
    },
    extraReducers: (builder) => {
      builder.addCase(requestСomponents.pending, () => console.log("Ждём компоненты с сервера"));//загрузка

      builder.addCase(requestСomponents.fulfilled,                                           //Всё отлично
                      (state, action) => {state.success = action.payload.success
                                          state.data = action.payload.data      
                                          console.log("компоненты получены")}); 

      builder.addCase(requestСomponents.rejected, () => console.log("Ошибка загузки"))       //ошибка
    }
  })

export const countIngreds = BurgerIngredientsSlice.actions.countIngreds;

  
const burgerIngredients = BurgerIngredientsSlice.reducer;
export default burgerIngredients;