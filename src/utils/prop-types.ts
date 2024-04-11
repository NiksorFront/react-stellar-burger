import { TypedUseSelectorHook, useDispatch as useDispatchRedux,
         useSelector as useSelectorRedux} from "react-redux";
import { store } from "../services";
import { ReactNode } from "react";
import { createAsyncThunk as createAsyncThunkRedux} from "@reduxjs/toolkit";



//Тпизация для компонентов
export type child = {children: ReactNode};


//Типизация useDispatch и useSelector
export type appDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchRedux<appDispatch>();

export type storeType = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<storeType> = useSelectorRedux;

export const createAsyncThunk = createAsyncThunkRedux.withTypes<{state: storeType; dispatch:appDispatch}>()

//Типы в хранилище
export type ingredientType = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    uniqueId: string,
    __v: number,
    _id: string
  }

export type initState = {success: boolean, data: Array<ingredientType>}

export type modalType = {open: boolean, data: {title: string,
                                               modal: string,
                                               content: string
                                              }}

export type profileType = {isAuth: boolean, user: {email: string,
                                                   name: string  
                                                  }}

export type authorizationType = {success: boolean, 
                                 user: {email: string,
                                      name: string  
                                  },
                                 accessToken: string, 
                                 refreshToken: string}

export type profilePayloadTypes = {payload: authorizationType};