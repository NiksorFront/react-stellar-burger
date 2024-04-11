import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import Login from "./pages/login/login";
import reportWebVitals from "./reportWebVitals";

import {Provider} from "react-redux"
import { useSelector } from "./utils/prop-types";
import {store} from "./services/index"
import {createBrowserRouter, RouterProvider, useLocation} from "react-router-dom"
import Register from "./pages/register/register";
import AppHeader from "./components/app-header/app-header";
import ForgotPassword from "./pages/forgot-password/forgot-password";
import ResetPassword from "./pages/reset-password/reset-password";
import Profile from "./pages/profile/profile"
import IngredientsId from "./pages/ingredients-id/ingredients-id";


const AddHeader = (children: ReactNode) => {
  return (<><AppHeader/>{children}</>)
}

function ModalPopup(){
  const background = useSelector(state => state.modal.open);

  return (<>
    <AppHeader/>
    {background ? <App/> 
                : <IngredientsId/>}
    </>)
}

                           
const router = createBrowserRouter([
  {
    path: "",  // главная страница, конструктор бургеров.
    element: AddHeader(<App/>)
  },
  {
    path: "/login", //страница авторизации
    element: AddHeader(<Login />)
  },
  {
    path: "/register", //страница регистрации
    element: AddHeader(<Register/>)
  },
  {
    path: "/forgot-password", //страница восстановления пароля
    element: AddHeader(<ForgotPassword/>)
  },
  {
    path: "/reset-password", //страница сброса пароля
    element: AddHeader(<ResetPassword />)
  },
  {
    path: "/profile", //страница с настройками профиля пользователя
    element: AddHeader(<Profile/>)
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
    element: <ModalPopup/>
    //element: <>{window.history.state === null ? AddHeader(<App/>) : AddHeader(<IngredientsId/>)}</>
  },
  {
    path: "*",
    element: <h1>404 еррор! <br/> Поиграйте лучше в <a href="https://krenol.ru">krenol.ru</a></h1>
  }
])


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>  
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
