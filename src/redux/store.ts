import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        books: bookReducer,
        search: searchReducer,
        cart: cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;