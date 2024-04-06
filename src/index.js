import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import Login from "./pages/login/login";
import reportWebVitals from "./reportWebVitals";

import {Provider} from "react-redux"
import {store} from "./services/index"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Register from "./pages/register/register";
import AppHeader from "./components/app-header/app-header";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ResetPassword from "./pages/reset-password/reset-password";
import Profile from "./pages/profile/profile"
import IngredientsId from "./pages/ingredients-id/ingredients-id";


//window.history.pushState({usr: "popupClose"}, "");                               
const router = createBrowserRouter([
  {
    path: "/",  // главная страница, конструктор бургеров.
    element: <App/>
  },
  {
    path: "/login", //страница авторизации
    element: <Login />
  },
  {
    path: "/register", //страница регистрации
    element: <Register/>
  },
  {
    path: "/forgot-password", //страница восстановления пароля
    element: <ForgotPassword/>
  },
  {
    path: "/reset-password", //страница сброса пароля
    element: <ResetPassword />
  },
  {
    path: "/profile", //страница с настройками профиля пользователя
    element: <Profile/>
  },
  {
    path: "/profile/orders",
    element: <p>Будет релизовано в следующем спринте</p>
  },
  {
    path: "/profile/orders/:id",
    element: <p>Будет релизовано в следующем спринте</p>
  },
  {
    path: "/ingredients/:id", // страница ингредиента
    element: <>{window.history.state === null ? <App/> : <IngredientsId/>}</>
  },
  {
    path: "*",
    element: <h1>404 еррор! <br/> Поиграйте лучше в <a href="https://krenol.ru">krenol.ru</a></h1>
  }
])

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppHeader/>
      <RouterProvider router={router}/>
      {/* <RouterProvider router={createBrowserRouter([{path: "/ingredients/:id",element: <IngredientsId/>}])}/> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
