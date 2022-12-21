import { createSlice } from '@reduxjs/toolkit';

export const packageDeliverySlice = createSlice({
    name: 'packageDelivery',
    initialState: {
        step: 0,
        destinatario: null,
        datosPaquete: null,
        origen: null,
        destino: null,
    },
    reducers: {
        incrementStep: (state, /* action */) => {
            if (state.step < 5) {
                state.step += 1;
            }
            return;
        },
        decrementStep: (state, /* action */) => {
            if (state.step >= 1) {
                state.step -= 1;
            }
        },
        setDestinatario: (state, action) => {
            state.destinatario = action.payload;
        },
        setDatosPaquete: (state, action) => {
            state.datosPaquete = action.payload;
        },
        setRouteOrigin: (state, { payload }) => {
            // console.log(payload);
            state.origen = payload;
        },
        setRouteDestiny: (state, { payload }) => {
            // console.log(payload);
            state.destino = payload;
        }
    },
});


// Action creators are generated for each case reducer function
export const {
    incrementStep,
    decrementStep,
    setDatosPaquete,
    setDestinatario,
    setRouteOrigin,
    setRouteDestiny
} = packageDeliverySlice.actions;