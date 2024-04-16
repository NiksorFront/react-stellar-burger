import {configureStore} from "@reduxjs/toolkit"
import {rootReducer} from './rootReducer';
import { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } from "./Slice/orderSlice/orderActions";
import { socketMiddlewareCreater } from "./middleware/socket-middleware";


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        socketMiddlewareCreater({wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage})
    ),
});