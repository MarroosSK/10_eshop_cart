import {configureStore} from "@reduxjs/toolkit"
import darkModeReducer from "../features/darkModeSlice"
import productsReducer from "../features/productsSlice";
import shoppingCartReducer from "../features/shoppingCartSlice";

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer,
        products: productsReducer,
        shoppingCart: shoppingCartReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;