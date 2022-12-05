import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { paymentSlice } from "./payment/paymentSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        //Debemos mandar el reducer
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        payment: paymentSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});