import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "../../../utils/prop-types"
import {request} from "../../../utils/API";
import { InitState } from "../../../utils/prop-types";


export const initialState: InitState = {success: false, data: []}

export const requestСomponents = createAsyncThunk(
  'BurgerIngredients/requestData',
  () => {const result: Promise<InitState> = request('ingredients')
                                            .then(res => res)

         return result;
        }
)

type count = {payload: [number, number]}

//список всех полученных ингредиентов
export const BurgerIngredientsSlice = createSlice({
    name: 'BurgerIngredients',
    initialState,
    reducers: {
      countIngreds: (state, {payload: [index, cnt]}: count) => {state.data[index].__v = cnt},
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