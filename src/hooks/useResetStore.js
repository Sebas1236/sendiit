// Objetivo realizar interacción con reset en store

import { useDispatch, useSelector } from "react-redux"
import resetApi from "../api/resetApi";
import sendiitApi from "../api/sendiitApi";
import { onChecking, clearErrorMessage, onLogout, onAddNewUser } from "../store";

export const useResetStore = () => {
    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //Proceso de RECUPERAR CONTRASEÑA
    const startRecoverEmail = async ({ email }) => {
        //Estado de carga
        dispatch(onChecking());
        //Llegar al BACKEND
        try {
            const { data } = await resetApi.post('/forgot-password', { email });
            dispatch( onLogout() );
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage);
            }, 10);
        }
    }

    //Proceso de RESTABLECER CONTRASEÑA
    const startResetPassword = async({ uid, token, password, password2 }) => {
        //Estado de carga
        console.log({ uid, token, password, password2 });
        dispatch( onChecking() );
        try {
            const { data } = await resetApi.post(`/reset-password/${uid}/${token}/`, { password, password2 });
            dispatch( onLogout() );
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage);
            }, 10);
        }
    }

    const startDeliveryManPassword = async({ token, password }) => {
        console.log({token, password});
        dispatch( onChecking() );
        try {
            const { data } = await sendiitApi.post(`/user/repartidores/${token}`, { password });
            const { usuario } = data;
            dispatch( onAddNewUser({usuario}));
        } catch (error) {
            console.log(error);
        }
    };

    return{
        //Propiedades
        errorMessage,
        status,

        //Métodos
        startRecoverEmail,
        startResetPassword,
        startDeliveryManPassword
    }
}