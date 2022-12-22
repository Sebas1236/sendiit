import { createSlice } from '@reduxjs/toolkit';

export const lockerSlice = createSlice({
    name: 'locker',
    initialState: {
        isLoadingLockers: true,
        locker_number: 0,
        lockers: [
            {
                id: 1,
                locker_name: 'Del Valle',
                locker_availability: 10,
                locker_coords: [-99.162953, 19.374037],
                minutes: 42,
            },
            {
                id: 2,
                locker_name: 'Satélite',
                locker_availability: 10,
                locker_coords: [-99.234005, 19.510558],
                minutes: 26,
            },
            {
                id: 3,
                locker_name: 'Coyoacán',
                locker_availability: 10,
                locker_coords: [-99.179423, 19.345436],
                minutes: 56,
            },
            {
                id: 4,
                locker_name: 'Santa Fe',
                locker_availability: 10,
                locker_coords: [-99.264389, 19.365604],
                minutes: 55,
            },
        ]
    },
    reducers: {
        onSetLockerNumber: (state, { payload }) => {
            state.locker_number = payload;
        },
        onLoadLockers: (state, { payload = [] }) => {
            state.isLoadingLockers = false;
            // state.lockers = payload;
            state.lockers[0].locker_availability = payload.numCasilleros[1];
            state.lockers[1].locker_availability = payload.numCasilleros[3];
            state.lockers[2].locker_availability = payload.numCasilleros[0];
            state.lockers[3].locker_availability = payload.numCasilleros[2];
            // payload.forEach( locker => {
            //     //Some regresa true si lo encuentra
            //     const exists = state.lockers.some( dbLocker => dbLocker._id === locker._id );
            //     if(!exists){
            //         state.lockers.push( locker );
            //     }
            // });

        },
    },
});


// Action creators are generated for each case reducer function
export const { onSetLockerNumber, onLoadLockers } = lockerSlice.actions;