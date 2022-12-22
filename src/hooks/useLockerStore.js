import { useDispatch, useSelector } from "react-redux"
import sendiitApi from "../api/sendiitApi";

export const useLockerStore = () => {
    const { locker_number, lockers } = useSelector( state => state.locker );
    const dispatch = useDispatch();

    const setLockerNumber = (tamano) => {
        try {
            const { data } = sendiitApi.get('/casilleros', {tamano});
            console.log(data);
            //TODO: sustituir disponibilidad
        } catch (error) {
            console.log(error);
        }
    }
    // const startLoadingCards = async () => {
    //     try {
    //         const { data } = await sendiitApi.get('/cards');
    //         const { creditCards } = data;
    //         dispatch(onLoadCards(creditCards));
    //     } catch (error) {
    //         console.log(error);
    //         console.log('Error cargando tarjetas');
    //     }
    // };
    return {
        //*Propiedades
        locker_number,
        lockers,
        //*Métodos
        setLockerNumber,

    }
}