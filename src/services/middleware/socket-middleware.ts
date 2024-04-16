import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit"
import { wsPayloadConnect } from "../../utils/prop-types"
import { getCookie, setCookie } from "../../utils/cookie"
import { requestPost } from "../../utils/API"


type WSActionsType = {
    wsConnect: ActionCreatorWithPayload<wsPayloadConnect>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
    wsMessage: ActionCreatorWithPayload<any>
}

export const socketMiddlewareCreater: (wsActions: WSActionsType) => Middleware = (wsActions) => {
    return store => {

        let socket: WebSocket | null = null;
        let wsUrl: string = '';                 //Ссылка на запрос 
        let withToken: boolean = false;  //Нужно ли презапрашивать токен через refresh
        let isConnected: boolean = false; //для востонав-
        let reconnectTimer: number = 0;   //ления соединения

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage} = wsActions;

            if (type === "order_WS_close"){
                socket?.close(1000, 'WS соединение закрыто успешно')
            }

            if (type === "order_WS_connect"){
                wsUrl = payload.wsUrl;
                withToken = payload.withToken;
                if(withToken){
                    const token: string = getCookie('accessToken')!
                    wsUrl = `${wsUrl}?token=${token.split(" ")[1]}`
                }
                socket = new WebSocket(wsUrl);
                isConnected = true;
                dispatch(wsConnecting())
            }
            if (isConnected){
                socket!.onopen = () => console.log("WebSocket cоединение открылось")         //Соединение открытолось

                socket!.onerror = event => {  console.log('Ошибка с websocket:', event);   } //Ошибка соединения 

                socket!.onclose = event => {                                                 //Соединение закрылось
                    if (event.code !== 1000) {                     //Если это какая-либо ошибка из-за неуспешного закрытия соединения, то 
                        dispatch(wsError(event.code.toString()))   //Выводим эту ошибку

                        //reconnectTimer = window.setTimeout(() => { //Попытка переподключение на случае, елси это был просто обрыв инета или чего-нибудь такого
                        //    dispatch(wsConnecting())
                        //    dispatch(wsConnect({wsUrl: wsUrl, withToken: withToken}))
                        //}, 5000)
                    }else{                                         //Если 1000 код, т.е. успешное закрытие, то 
                        clearTimeout(reconnectTimer)               //Обнуляем 
                        reconnectTimer = 0;                        //таймер
                        isConnected = false;                       //и пишем, что конект исчез
                        socket!.close(1000)
                        console.log(event?.reason)                 //Выводим закрывающие сообщение
                    }
          
                  };
                
                socket!.onmessage = event => {
                    const parsedData = JSON.parse(event.data);
                    if(withToken && parsedData.message === "Invalid or missing token"){
                        requestPost([{token: getCookie('refreshToken')}, 'auth/token'])
                        .then(res => {
                            console.log(res)
                            setCookie('accessToken', res.accessToken, {'max-age': 1000})
                            dispatch(wsConnect({wsUrl: wsUrl, withToken: false}))
                        })
                        .catch(err => console.log("Ошибка обновления токена:", err))
                    }
                    dispatch(wsMessage(parsedData));
                    dispatch(wsOpen())
                }
                
            }
                
                    /*case "order_WS_disconnect":
                    console.log("дисконект")
                    break;
                case "order_WS_connecting":
                    console.log("просиходит конект")
                    break;
                case "order_WS_open":
                    console.log("соединение открыто")
                    break;
                case "order_WS_close":
                    console.log("соединение закрыто")
                    break;
                case "order_WS_error":
                    console.log("В соединении ошибка")
                    break;
            }*/

            next(action);
        }
    }
}