import { createSlice } from '@reduxjs/toolkit';

//TODO: LEER DEL BACKEND
const tempCard =
{
    _id: 1,
    cardName: 'Sebastián',
    cardNumber: '123456',
    month: 10,
    year: 2033,
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Sebas'
    }
}

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        cards: [
            tempCard,
        ],
        activeCard: null,
    },
    reducers: {
        onSetActiveCard: (state, { payload }) => {
            state.activeCard = payload;
        },
        onAddNewCard: (state, { payload }) => {
            state.cards.push(payload);
            state.activeCard = null;
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
    },
});


// Action creators are generated for each case reducer function
export const { onSetActiveCard, onAddNewCard, onUpdateCard, onDeleteCard } = paymentSlice.actions;