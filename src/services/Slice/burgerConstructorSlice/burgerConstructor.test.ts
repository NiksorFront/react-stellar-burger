import { IngredientType } from "../../../utils/prop-types";
import burgerConstructor, {addIngred, delIngred, initialState, repIngred} from "./burgerConstructorSlice";

const generateIngred: IngredientType = {
    _id: Math.random().toString(),
    uniqueId: Math.random().toString(),
    calories: Math.random(),
    carbohydrates: Math.random(),
    fat: Math.random(),
    image: "https://test.png",
    image_large: "https://test_large.png",
    image_mobile: "https://test_mobile.png",
    name: "ingredient",
    price: Math.random(),
    proteins: Math.random(),
    type: "bun",
    __v: Math.random(),
}

describe("burgerConstructor", () => {
    const index: number = 0;
    const mockIngredient: IngredientType = generateIngred
    const mockIngredientTwo: IngredientType = generateIngred

       
    //Тестим добавление ингредиента с сервера в хранилище 
    it("should handle adding ingredient action", () => {
        const action = addIngred([mockIngredient, index]);
        const state = burgerConstructor(initialState, action);

        expect(state[index]).toBe(mockIngredient)
    })

    //Проверяем как работает замена элиментоа 
    it("should handle replace ingredient action", () => {
        const action = repIngred([0, 1]) //Меняем местами элементы 0 и 1
        const state = burgerConstructor([...initialState, mockIngredient, mockIngredientTwo], action)

        expect(state[index]).toBe(mockIngredientTwo)
    })

    //Тестим удаление игредиента из хранилища
    it("should handle delete ingredient action", () => {
        const action = delIngred(index);
        const state = burgerConstructor(initialState, action);

        expect(state[index]).toBe(undefined);
    })
})