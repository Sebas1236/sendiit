import { useDispatch, useSelector } from "react-redux"
import sendiitApi from "../api/sendiitApi";
import { onLoadLockers } from "../store";

export const useLockerStore = () => {
    const { locker_number, lockers } = useSelector( state => state.locker );
    const dispatch = useDispatch();

    const setLockerNumber = async(tamano) => {
        try {
            console.log(tamano);
            const { data } = await sendiitApi.post('/casilleros', {tamano});
            console.log(data);
            dispatch( onLoadLockers(data) );
            //TODO: sustituir disponibilidad
        } catch (error) {
            console.log(error);
        }
    };


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