import { createSlice } from "@reduxjs/toolkit";
import { modalType } from "../../utils/prop-types";

const initialState: modalType = {open: false, 
                                 data: {title: "",
                                        modal: "",
                                        content: ""}};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        popupOpen: (state, action) => {state.open = action.payload},
        popupContent: (state, action) => {state.data = action.payload; }
    }
})

export const popupOpen = modalSlice.actions.popupOpen;
export const popupContent = modalSlice.actions.popupContent;

const modal = modalSlice.reducer
export default modal;