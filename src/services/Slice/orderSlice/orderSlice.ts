import { createSlice } from "@reduxjs/toolkit";
import {createAsyncThunk} from "../../../utils/prop-types"
import { requestPost, requestCreateOrder } from "../../../utils/API";

export const initialOrder: {number:string} = {number: ""}

export const reqOrder = createAsyncThunk(
    "order/requestOrder",
    ([ingredients, token]:[Array<string>, string]) => {
        //requestCreateOrder
        const result: Promise<string> = requestCreateOrder([{"ingredients": ingredients},token])
                                        .then(res => res.order.number)

        return result;
    }
)
export const orderSplice = createSlice({
    name: "order",
    initialState: initialOrder,
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

export default orderSplice.reducer;