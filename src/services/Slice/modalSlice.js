import { createSlice } from "@reduxjs/toolkit";

const initialState = {open: false, 
                      data: {title: "",
                             modal: "",
                             content: ""}};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        open: (state, action) => {state.open = action.payload},
        content: (state, action) => {state.data = action.payload; }
    }
})

export const popupOpen = modalSlice.actions.open;
export const popupContent = modalSlice.actions.content;

const modal = modalSlice.reducer
export default modal;