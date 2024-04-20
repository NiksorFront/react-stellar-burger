import { OrderListType, OrderType } from "../../../utils/prop-types";
import { wsError, wsMessage } from "./orderActions";
import { initialState, orderReducer } from "./orderReducers";
import orderSlice, { initialOrder, reqOrder } from "./orderSlice";


const generateIngred = ():OrderType =>{
    const status = ['pending', "created", 'done'];
    return ({_id: Math.random().toString(),
            ingredients: [Math.random().toString(), Math.random().toString()],
            status: status[Math.floor(Math.random()*3)],
            name: "name",
            createdAt: "12:00",
            updatedAt: "12:00",
            number: Math.random(),
          })
}
  
describe("order", () =>{
    //Тестим присвоение номера заказа
    it("should handle reqOrder.fulfilled action", () => {
        const mockNumber: string = Math.random().toString();  //Имментируем номер успешного экщена

        const action = reqOrder.fulfilled(mockNumber, "", [[""], 'orders']); //Имментируем успешный экшен
        const state = orderSlice(initialOrder, action)                     //Отправляем экшен в редьюсер

        expect(state.number).toBe(mockNumber);
    })

    //Тестим обработку ошибок
    it("should handle error action", () => {
        const mockError = "Ой, ай - ошибка";

        const action = wsError(mockError);
        const state = orderReducer(initialState, action);

        expect(state.connectionError).toBe(mockError);
    })

    //Тестим загрузку заказов в table
    it("should handle Message action", () => {   
        const mockMessage: OrderListType = {
            success: true,
            orders: [generateIngred(), generateIngred()],
            total: Math.random(),
            totalToday: Math.random()
        }

        const action = wsMessage(mockMessage)
        const state = orderReducer(initialState, action);

        expect(state.table).toBe(mockMessage);
    })

    /*Внезависимости от входных данных в экшены wsConnecting, wsOpen, wsClose результат не поменяется. 
    Так что для них тесты не писал за ненадобностью*/
})