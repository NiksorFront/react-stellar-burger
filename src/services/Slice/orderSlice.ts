import { createSlice } from "@reduxjs/toolkit";
import {createAsyncThunk} from "../../utils/prop-types"

import { requestPost } from "../../utils/API";

const initialState: {number:string} = {number: ""}

export const reqOrder = createAsyncThunk(
    "order/requestOrder",
    ([ingredients, endpoint]:[Array<string>, string]) => {
        const result: Promise<string> = requestPost([{"ingredients": ingredients},endpoint])
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

const order = orderSplice.reducer;
export default order;