import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        isMapReady: false,
        map: undefined,
        markers: [],
    },
    reducers: {
        // setMap
        mapReducer: ( state, action ) => {
            state.isMapReady = true;
            state.map = action.payload;
        },
        setMarkers: ( state, action ) => {
            state.markers = action.payload;
        }
    },
});


// Action creators are generated for each case reducer function
export const { mapReducer, setMarkers } = mapSlice.actions;