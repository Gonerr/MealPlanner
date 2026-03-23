import { configureStore } from "@reduxjs/toolkit";
import MenuState from "../../src/features/menu/menuSlice"


export const store = configureStore({
    reducer: {
        menu: MenuState,
        //TODO добавить другие редюсеры
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;