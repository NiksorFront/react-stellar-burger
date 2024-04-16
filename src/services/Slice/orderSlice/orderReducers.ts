
import {createReducer} from '@reduxjs/toolkit';
//import { WebsocketStatus } from "../../../utils/constants";
import { wsClose, wsConnecting, wsError, wsOpen, wsMessage } from './orderActions';
import {OrderListType} from "../../../utils/prop-types"
//import { liveTableUpdate } from './live-table-update';


type stateType = {
    status: string
    connectionError: string,
    table: OrderListType,
}

const initialState: stateType = {
    status: '',
    connectionError: '',
    table:{
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    }
}

export const orderReducer = createReducer(
    initialState, 
    (builder) => {builder
        .addCase(wsConnecting, state => {state.status = "loading"})
        .addCase(wsOpen, state => {state.status = "open"})
        .addCase(wsClose, state => {state.status = "close"})
        .addCase(wsError, (state, action) => {
            state.connectionError = action.payload;
            console.log("В соединении ошибка", action.payload)
        })
        .addCase(wsMessage, (state, action) => {
            state.table = action.payload
            //console.log( state.table)
        } )
})