import { IngredientType } from "../../../utils/prop-types";
import burgerIngredients, { countIngreds, initialState as initSt} from "./BurgerIngredientsSlice"


const id = Math.random();
const initialState = {success: initSt.success, data:  [{_id: Math.random().toString(),
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
                                                        __v: id,}]
                     }


describe("BurgerIngredients", ()=>{

    it("should handle count ingredients", ()=>{
        const index = 0;

        const action = countIngreds([index, id])
        const state = burgerIngredients(initialState, action);

        expect(state.data[index].__v).toBe(id);
    })
})