import { createSlice } from '@reduxjs/toolkit';

//Para saber del Modal, o UI en general
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isCreditCardModalOpen: false,
    },
    reducers: {
        onOpenCreditCardModal: ( state ) => {
            state.isCreditCardModalOpen = true;
        },
        onCloseCreditCardModal: ( state ) => {
            state.isCreditCardModalOpen = false;
        },
    },
});


// Action creators are generated for each case reducer function
export const { onOpenCreditCardModal, onCloseCreditCardModal } = uiSlice.actions;