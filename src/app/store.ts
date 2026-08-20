import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredients/ingredientsSlice";
import menuReducer from "../features/menu/menuSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    ingredients: ingredientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
