import { createSlice } from '@reduxjs/toolkit';

export const placesSlice = createSlice({
    name: 'places',
    initialState: {
        isLoading: true,
        userLocation: undefined,
        isLoadingPlaces: false,
        places: [],
    },
    reducers: {
        //setUserLocation
        placesReducer: (state, { payload }) => {
            state.userLocation = payload.lngLat;
            state.isLoading = false;
        },
        setPlaces: ( state, action ) => {
            state.isLoadingPlaces = false;
            state.places = action.payload;
        },
        setLoadingPlaces: ( state ) => {
            state.isLoadingPlaces = true;
            state.places = [];
        }

    },
});


// Action creators are generated for each case reducer function
export const { placesReducer, setPlaces, setLoadingPlaces } = placesSlice.actions;