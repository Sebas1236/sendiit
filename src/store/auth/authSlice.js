import { createSlice } from '@reduxjs/toolkit';

//TODO: userSlice.js
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'Cliente','Repartidor','Administrador', 'not authenticated'
        user: {},
        errorMessage: undefined,
        isLoadingUser: true,
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        //Significa que la persona está autenticada
        onLogin: ( state, { payload } ) => {
            // state.status = 'authenticated';
            state.status = payload.role;
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onLoadUser: (state, { payload } ) => {
            state.isLoadingUser = false;
            state.user = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    },
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onLoadUser, clearErrorMessage } = authSlice.actions;