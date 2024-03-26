import {configureStore} from "@reduxjs/toolkit"
import {rootReducer} from './rootReducer';

//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));
export const store = configureStore({
    reducer: rootReducer,
});