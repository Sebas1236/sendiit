import { createSlice } from '@reduxjs/toolkit';

export const packageSlice = createSlice({
    name: 'package',
    initialState: {
        isLoadingPackages: true,
        packages: [
            //tempPackage
        ],
        message: undefined,
        activePackage: null,
    },
    reducers: {
        onSetActivePackage: (state, { payload }) => {
            state.activePackage = payload;
        },
        onAddNewPackage: (state, { payload }) => {
            state.packages.push(payload);
        },  
        onLoadPackages: (state, { payload = [] }) => {
            state.isLoadingPackages = false;
            state.packages = payload;
            // state.cards = payload;
            payload.forEach( paquete => {
                //Some regresa true si lo encuentra
                const exists = state.packages.some( dbPackage => dbPackage._id === paquete._id );
                if(!exists){
                    state.packages.push( paquete );
                }
            });
        },
        onLogoutPackage: ( state ) => {
            state.isLoadingPackages = true;
            state.packages = [];
            state.activePackage = null;
        },
    },
});


// Action creators are generated for each case reducer function
export const { 
    onSetActivePackage,
    onAddNewPackage, 
    onLoadPackages, 
    onLogoutPackage,
} = packageSlice.actions;