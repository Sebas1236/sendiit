// Objetivo realizar interacción con reset en store

import { useDispatch, useSelector } from "react-redux"
import resetApi from "../api/resetApi";
import { onChecking, clearErrorMessage, onLogout } from "../store";

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

    return{
        //Propiedades
        errorMessage,
        status,

        //Métodos
        startRecoverEmail,
        startResetPassword,
    }
}