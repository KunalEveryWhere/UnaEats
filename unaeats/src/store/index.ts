import { configureStore } from "@reduxjs/toolkit";
import foodItemsReducer from "./foodItemsReducer";

export const store = configureStore({
    reducer: {
        foodItem: foodItemsReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
