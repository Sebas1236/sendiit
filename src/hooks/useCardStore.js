import { useDispatch, useSelector } from "react-redux"
import { onAddNewCard, onDeleteCard, onSetActiveCard, onUpdateCard } from "../store";

export const useCardStore = () => {

    const { cards, activeCard } = useSelector( state => state.payment ); 
    const dispatch = useDispatch();

    const setActiveCard = ( paymentCard ) => {
        dispatch( onSetActiveCard( paymentCard ) );
    };

    //Crear una nueva tarjeta
    const startSavingCard = async( paymentCard ) => {
        //TODO: LLEGAR AL BACKEND

        //Todo bien
        if( paymentCard._id ) {
            //Actualizando
            dispatch( onUpdateCard({ ...paymentCard }) );
        }else{
            //Creando
            dispatch( onAddNewCard({ ...paymentCard, _id: 5 }) );
        }
    }

    const startDeletingCard = () => {
        //TODO: LLEGAR AL BACKEND
        dispatch( onDeleteCard() );
    }

    return {
        //*Propiedades
        activeCard,
        cards,
        hasCardSelected: !!activeCard,

        //*Métodos
        startDeletingCard,
        setActiveCard,
        startSavingCard,
    }
};
