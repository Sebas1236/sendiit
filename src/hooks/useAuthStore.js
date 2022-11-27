// Objetivo realizar interacción con auth en store

import { useDispatch, useSelector } from "react-redux"
import sendiitApi from "../api/sendiitApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    // PROCESO DE LOGIN
    const startLogin = async({ email, password }) => {
        //Estado de carga
        dispatch( onChecking() );
        //LLEGAR AL BACKEND
        try {
            // Es una petición POST dónde se envían email y password
            // Segmento adicional de URL
            const { data } = await sendiitApi.post('/auth',{email, password,});
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage );
            }, 10);
        }
    }

    //startRegister
    const startRegister = async({ email, last_name, name , password }) => {
            //Estado de carga
            dispatch( onChecking() );
            try {
                const { data } = await sendiitApi.post('/auth/new', { name, last_name, email, password });
                localStorage.setItem('token', data.token );
                localStorage.setItem('token-init-date', new Date().getTime() );
                dispatch( onLogin({ name: data.name, uid: data.uid }) );
            } catch (error) {
                dispatch( onLogout( error.response.data?.msg || '--' ) );
                setTimeout(() => {
                    dispatch( clearErrorMessage );
                }, 10);
            }
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout() );

        try {
            const { data } = await sendiitApi.get('auth/renew');
            localStorage.setItem('token', data.token );
            // En caso de validación con esta fecha
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            //El token ya no funciona
            localStorage.clear();
            dispatch( onLogout() );
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos - Acciones que se podrán llamar para interactuar con el store
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}