import modal, { initialState,  popupOpen } from "./modalSlice"

describe("modal", () => {
    //Открытие попапа
    it("should handle open Popup action", () => {
        const action = popupOpen(true);
        const state = modal(initialState, action);

        expect(state.open).toBe(true)
    })

    //Закрытие попапа
    it("should handle close Popup action", () => {
        const action = popupOpen(false);
        const state = modal(initialState, action);

        expect(state.open).toBe(false)
    })
})