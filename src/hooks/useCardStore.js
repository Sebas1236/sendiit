import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import sendiitApi from "../api/sendiitApi";
import { onAddNewCard, onDeleteCard, onLoadCards, onSetActiveCard, onUpdateCard } from "../store";

export const useCardStore = () => {

    const { cards, activeCard } = useSelector(state => state.payment);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const setActiveCard = (paymentCard) => {
        dispatch(onSetActiveCard(paymentCard));
    };

    //Crear una nueva tarjeta
    const startSavingCard = async (paymentCard) => {
        //TODO: LLEGAR AL BACKEND
        try {
            if (paymentCard._id) {
                //Actualizando
                await sendiitApi.put(`/cards/${paymentCard._id}`, paymentCard);
                dispatch(onUpdateCard({ ...paymentCard, user }));
                return;
            } else {
                //Creando
                const { data } = await sendiitApi.post('/cards', paymentCard);
                // console.log(data.savedCard._id);
                dispatch(onAddNewCard({ ...paymentCard, _id: data.savedCard._id, user }));
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error');
        }
        //Todo bien

    };

    const startDeletingCard = async() => {
        //TODO: LLEGAR AL BACKEND
        try {
            await sendiitApi.delete(`/cards/${activeCard._id}`);
            dispatch(onDeleteCard());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
        }
        
    };

    const startLoadingCards = async () => {
        try {
            const { data } = await sendiitApi.get('/cards');
            const { creditCards } = data;
            dispatch(onLoadCards(creditCards));
        } catch (error) {
            console.log(error);
            console.log('Error cargando tarjetas');
        }
    };

    return {
        //*Propiedades
        activeCard,
        cards,
        hasCardSelected: !!activeCard,

        //*Métodos
        setActiveCard,
        startDeletingCard,
        startLoadingCards,
        startSavingCard,
    }
};
