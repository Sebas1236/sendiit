import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { mapSlice } from "./maps/mapSlice";
import { packageDeliverySlice } from "./package/packageDeliverySlice";
import { packageSlice } from "./package/packageSlice";
import { paymentSlice } from "./payment/paymentSlice";
import { placesSlice } from "./places/placesSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        //Debemos mandar el reducer
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        payment: paymentSlice.reducer,
        packageDelivery: packageDeliverySlice.reducer,
        places: placesSlice.reducer,
        map: mapSlice.reducer,
        package: packageSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});