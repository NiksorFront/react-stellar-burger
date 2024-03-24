import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {request} from "../../components/api/API";

const initialState = {success: false, data: []}

export const requestСomponents = createAsyncThunk(
  'BurgerIngredients/requestData',
  () => {const itog = request('ingredients')
                      .then(res => res)
                      .catch(err => console.log(err));

        return itog;
        }
)


//список всех полученных ингредиентов
export const BurgerIngredientsSlice = createSlice({
    name: 'BurgerIngredients',
    initialState,
    reducers: {
      count: (state, {payload: [index, cnt]}) => {state.data[index].__v = cnt},
    },
    extraReducers: (builder) => {
      builder.addCase(requestСomponents.pending, () => console.log("Ждём данные с сервера"));//загрузка

      builder.addCase(requestСomponents.fulfilled,                                           //Всё отлично
                      (state, action) => {state.success = action.payload.success
                                          state.data = action.payload.data      }); 

      //builder.addCase(handleRequest.rejected, (state, action) => {})                       //ошибка
    }
  })

export const countIngreds = BurgerIngredientsSlice.actions.count;

  
const burgerIngredients = BurgerIngredientsSlice.reducer;
export default burgerIngredients;