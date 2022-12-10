import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        isLoadingCards: true,
        cards: [
            // tempCard,
        ],
        message: undefined,
        activeCard: null,
    },
    reducers: {
        onSetActiveCard: (state, { payload }) => {
            state.activeCard = payload;
        },
        onAddNewCard: (state, { payload }) => {
            state.cards.push(payload);
        },
        onUpdateCard: (state, { payload }) => {
            //Map regresa un nuevo arreglo basado en el valor de retorno
            state.cards = state.cards.map(card => {
                //Es la misma tarjeta
                if (card._id === payload._id) {
                    return payload;
                }
                return card;
            });
        },
        onDeleteCard: (state) => {
            if (state.activeCard) {
                //regresar todas las tarjetas distintos al id
                state.cards = state.cards.filter(card => card._id !== state.activeCard._id);
                state.activeCard = null;
            }
        },
        onLoadCards: (state, { payload = [] }) => {
            state.isLoadingCards = false;
            // state.cards = payload;
            payload.forEach( card => {
                //Some regresa true si lo encuentra
                const exists = state.cards.some( dbCard => dbCard._id === card._id );
                if(!exists){
                    state.cards.push( card );
                }
            });
        },
        onLogoutCard: ( state ) => {
            state.isLoadingCards = true;
            state.cards = [];
            state.activeCard = null;
        },
    },
});


// Action creators are generated for each case reducer function
export const { 
    onAddNewCard, 
    onDeleteCard, 
    onLoadCards,
    onLogoutCard,
    onSetActiveCard, 
    onUpdateCard, 
} = paymentSlice.actions;