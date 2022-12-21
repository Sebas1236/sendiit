import { useDispatch, useSelector } from "react-redux"
import { decrementStep, incrementStep, setDatosPaquete, setDestinatario, setRouteDestiny, setRouteOrigin } from "../store";

export const usePackageDeliveryStore = () => {

    const { step, destinatario, datosPaquete, origen, destino } = useSelector(state => state.packageDelivery);
    const dispatch = useDispatch();

    const setIncrementStep = () => {
        dispatch(incrementStep());
    }

    const setDecrementStep = () => {
        dispatch(decrementStep());
    }

    const startSetDestinatario = (destinatario) => {
        dispatch(setDestinatario(destinatario));
    };

    const startSetDatosPaquete = (paquete) => {
        dispatch(setDatosPaquete(paquete));
    };

    const startSetOrigen = (routeOrigin) => {
        dispatch(setRouteOrigin(routeOrigin));
    };

    const startSetDestino = (routeDestiny) => {
        dispatch(setRouteDestiny(routeDestiny));
    };

    // const startSavingDelivery = () => {
    //     //TODO: LLEGAR AL BACKEND
    // };

    return {
        //*Propiedades
        step,
        destinatario,
        datosPaquete,
        origen,
        destino,
        //*Métodos
        setIncrementStep,
        setDecrementStep,
        startSetDestinatario,
        startSetDatosPaquete,
        startSetOrigen,
        startSetDestino,
    }
}