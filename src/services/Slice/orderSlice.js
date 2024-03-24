import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestNumber } from "../../components/api/API";

const initialState = {number: ""}

export const reqOrder = createAsyncThunk(
    "order/requestOrder",
    ([ingredients, endpoint]) => {
        const itog = requestNumber([{"ingredients": ingredients},endpoint])
                     .then(res => res.order.number)
                     .catch("error")

        //console.log(itog)
        return itog;
    }
)
export const orderSplice = createSlice({
    name: "order",
    initialState,
    reducers:{
        print: (state, action) => {console.log(action.payload)},
    },
    extraReducers: (builder) =>{
        builder.addCase(reqOrder.pending, (state) => {state.number = "loading..."});
        
        builder.addCase(reqOrder.fulfilled,
                        (state, action) => {state.number = action.payload});
    }
})

//export const reqOrder = orderSplice.actions.requestOrder;

const order = orderSplice.reducer;
export default order;