import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestPost } from "../../utils/API";

const initialState = {number: ""}

export const reqOrder = createAsyncThunk(
    "order/requestOrder",
    ([ingredients, endpoint]) => {
        const result = requestPost([{"ingredients": ingredients},endpoint])
                       .then(res => res.order.number)

        return result;
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

        builder.addCase(reqOrder.rejected, (state) => {state.number = "error"});
    }
})

//export const reqOrder = orderSplice.actions.requestOrder;

const order = orderSplice.reducer;
export default order;