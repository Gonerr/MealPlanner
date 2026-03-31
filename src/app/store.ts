import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../features/menu/menuSlice';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';


export const store = configureStore({
    reducer: {
        menu: menuReducer,
        ingredients: ingredientsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;