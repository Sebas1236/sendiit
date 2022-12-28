import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoadingUsers: true,
        users: [
            //tempUser
        ],
        message: undefined,
        activeUser: null,
    },
    reducers: {
        onSetActiveUser: (state, { payload }) => {
            state.activeUser = payload;
        },
        onAddNewUser: (state, { payload }) => {
            state.users.push(payload);
        },
        onUpdateUser: (state, { payload }) => {
            //Map regresa un nuevo arreglo basado en el valor de retorno
            state.users = state.users.map(user => {
                //Es la misma tarjeta
                if (user._id === payload._id) {
                    return payload;
                }
                return user;
            });
        },
        onDeleteUser: (state) => {
            if (state.activeUser) {
                //regresar todas las tarjetas distintos al id
                state.users = state.users.filter(user => user._id !== state.activeUser._id);
                state.activeUser = null;
            }
        },
        onLoadUsers: (state, { payload = [] }) => {
            state.isLoadingUsers = false;
            state.users = payload;
            // state.users = payload;
            payload.forEach(usuario => {
                //Some regresa true si lo encuentra
                const exists = state.users.some(dbUser => dbUser._id === usuario._id);
                if (!exists) {
                    state.users.push(usuario);
                }
            });
        },
        //TODO: ACTIVAR / DESACTIVAR REPARTIDOR
        onLogoutUser: (state) => {
            state.isLoadingUsers = true;
            state.users = [];
            state.activeUser = null;
        },
    },
});


// Action creators are generated for each case reducer function
export const {
    onSetActiveUser,
    onAddNewUser,
    onUpdateUser,
    onDeleteUser,
    onLoadUsers,
    onLogoutUser
} = userSlice.actions;