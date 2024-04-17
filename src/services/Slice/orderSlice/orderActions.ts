import { createAction } from "@reduxjs/toolkit"
import { OrderListType, wsPayloadConnect } from "../../../utils/prop-types";

export const wsConnect = createAction<wsPayloadConnect>("order_WS_connect"); //Открытие webSocket соединения
export const wsDisconnect = createAction("order_WS_disconnect");             //Соединение прервалось
export const wsConnecting = createAction("order_WS_connecting");             //Соединение устанавливается 
export const wsOpen = createAction("order_WS_open");                         //Соединение открылось
export const wsClose = createAction("order_WS_close");                       //Закрыть соединение
export const wsError = createAction<string>("order_WS_error");               //Ошибка соединения
export const wsMessage = createAction<OrderListType>("order_WS_message")     //Получение сообщений с сервера