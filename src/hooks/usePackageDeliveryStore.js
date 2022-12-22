import { useDispatch, useSelector } from "react-redux"
import { decrementStep, incrementStep, onLogoutPackageDelivery, onSetKms, setDatosPaquete, setDestinatario, setRouteDestiny, setRouteOrigin } from "../store";

export const usePackageDeliveryStore = () => {

    const { step, destinatario, datosPaquete, origen, destino, kms } = useSelector(state => state.packageDelivery);
    const dispatch = useDispatch();

    const setIncrementStep = () => {
        dispatch(incrementStep());
    }

    const setDecrementStep = () => {
        dispatch(decrementStep());
    }

    const setKms = (kilometers) => {
        dispatch( onSetKms(kilometers) );
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

    const clearPackageInfo = () => {
        dispatch( onLogoutPackageDelivery() );
    }

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
        kms,
        //*Métodos
        setIncrementStep,
        setDecrementStep,
        startSetDestinatario,
        startSetDatosPaquete,
        startSetOrigen,
        startSetDestino,
        setKms,
        clearPackageInfo,
    }
}