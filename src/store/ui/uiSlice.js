import { createSlice } from '@reduxjs/toolkit';

//Para saber del Modal, o UI en general
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isCreditCardModalOpen: false,
        isNewUserModalOpen: false,
    },
    reducers: {
        onOpenCreditCardModal: ( state ) => {
            state.isCreditCardModalOpen = true;
        },
        onCloseCreditCardModal: ( state ) => {
            state.isCreditCardModalOpen = false;
        },
        onOpenNewUserModal: ( state ) => {
            state.isNewUserModalOpen = true;
        },
        onCloseNewUserModal: ( state ) => {
            state.isNewUserModalOpen = false;
        },
    },
});


// Action creators are generated for each case reducer function
export const { onOpenCreditCardModal, onCloseCreditCardModal, onCloseNewUserModal, onOpenNewUserModal } = uiSlice.actions;