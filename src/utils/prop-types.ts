import { TypedUseSelectorHook, useDispatch as useDispatchRedux,
         useSelector as useSelectorRedux} from "react-redux";
import { store } from "../services";
import { ReactNode } from "react";
import { createAsyncThunk as createAsyncThunkRedux} from "@reduxjs/toolkit";



//Тпизация для компонентов
export type Child = {children: ReactNode};


//Типизация useDispatch и useSelector
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchRedux<AppDispatch>();

export type StoreType = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<StoreType> = useSelectorRedux;

export const createAsyncThunk = createAsyncThunkRedux.withTypes<{state: StoreType; dispatch:AppDispatch}>()

//Типы в хранилище
export type IngredientType = {
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

export type InitState = {success: boolean, data: Array<IngredientType>}

export type ModalType = {open: boolean, data: {title: string,
                                               modal: string,
                                               content: string
                                              }}

export type ProfileType = {isAuth: boolean, user: {email: string,
                                                   name: string  
                                                  }}

export type AuthorizationType = {success: boolean, 
                                 user: {email: string,
                                      name: string  
                                  },
                                 accessToken: string, 
                                 refreshToken: string}

export type ProfilePayloadTypes = {payload: AuthorizationType};