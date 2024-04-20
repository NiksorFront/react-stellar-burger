import {URL} from "../../src/utils/API";



describe('drag and drop works', () => {
  before(function () {
    cy.intercept('GET', `${URL}/ingredients`, {fixture: 'ingredients.json'})
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
  });

  //Проверка на перетаскивание ингредиента
  it( "should drag ingredient",() =>{ 
    cy.get('[data-cy=ingredient]').contains('Краторная булка N-200i').as('bun');                //Булочка
    cy.get('[data-cy=ingredient]').contains('Биокотлета из марсианской Магнолии').as('cutlet'); //Котлеета
    cy.get('[data-cy=constructor]').as('constructor');                                          //Конструктор
    
    cy.get('@bun').trigger("dragstart");
    cy.get('@constructor').trigger('drop');
    cy.get('@cutlet').trigger("dragstart");
    cy.get('@constructor').trigger('drop');

    cy.get('@constructor').contains('Краторная булка N-200i').should("exist");
    cy.get('@constructor').contains('Биокотлета из марсианской Магнолии').should("exist");
    
  })
})

describe("order and modal works", () => {
  beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.intercept("GET", `${URL}/ingredients`, { fixture: "ingredients.json" });
      cy.intercept("POST", `${URL}/auth/token`, { fixture: "login.json" });
      window.localStorage.setItem("accessToken", "mockAccessToken");
      window.localStorage.setItem("refreshToken", "mockRefreshToken");
      cy.visit('http://localhost:3000/');
  });

  //Проверка на возможность оформит заказ
  it("should order placed",() =>{ 
    cy.get('[data-cy=ingredient]').contains('Краторная булка N-200i').as('bun'); cy.get('[data-cy=ingredient]').contains('Биокотлета из марсианской Магнолии').as('cutlet');cy.get('[data-cy=constructor]').as('constructor');cy.get('@bun').trigger("dragstart");cy.get('@constructor').trigger('drop');cy.get('@cutlet').trigger("dragstart");cy.get('@constructor').trigger('drop');

    cy.get('[data-cy=createOrder]').click(); //При первом клике проверяется авторизация
    cy.get('[data-cy=createOrder]').click(); //Тут уже оформляется заказ

    cy.get('[data-cy=close]').click();  //Закрываем модалку
  })
});

