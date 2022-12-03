// Objetivo realizar interacción con auth en store

import { useDispatch, useSelector } from "react-redux"
import resetApi from "../api/resetApi";
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
            // console.log(data.token);
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            // console.log( data.name );
            dispatch( onLogin({ name: data.name, uid: data.uid, last_name: data.last_name, email , password: data.password, phone: data.phone }) );

        } catch (error) {
            dispatch( onLogout(error.response.data?.msg || '--') );
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
                // localStorage.setItem('token', data.token );
                // localStorage.setItem('token-init-date', new Date().getTime() );
                dispatch( onLogout() );
                // dispatch( clearErrorMessage );
                // dispatch( onLogin({ name: data.name, uid: data.uid }) );
            } catch (error) {
                dispatch( onLogout( error.response.data?.msg || '--' ) );
                dispatch( clearErrorMessage );
            }
    };

    const verificarUsuario = async({ confirmationCode })=> {
        console.log(confirmationCode);
        console.log('entra');
        dispatch( onChecking() );
        try {
            const { data } = await sendiitApi.get(`/auth/confirm/${confirmationCode}`, {confirmationCode: confirmationCode} );
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogout() );
        } catch (error) {
            console.log('error');
            dispatch( onLogout( 'Porfavor verifique su cuenta') );
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
            // console.log({ data });
            localStorage.setItem('token', data.token );
            // En caso de validación con esta fecha
            // localStorage.setItem('token-init-date', new Date().getTime() );
            //TODO: MEJORAR
            dispatch( onLogin({ name: data.name, uid: data.uid, email: data.email, last_name: data.last_name, password: data.password, phone: data.phone}) );
        } catch (error) {
            //El token ya no funciona
            localStorage.clear();
            dispatch( onLogout() );
        }
    };

    const startUpdate = async({ uid, name, last_name, email, password, phone }) => {
        // dispatch( onChecking() );
        try {
            //TODO CAMBIAR DE LUGAR
            const { data } = await resetApi.put(`/${uid}`, {name, last_name, email, password, phone})
            dispatch( onLogin({ name: data.name, uid: data.uid, email: data.email, last_name: data.last_name, password: data.password, phone: data.phone}) );
        } catch (error) {
            console.log('error');
            dispatch( onLogout( 'Error al actualizar usuario') );
            setTimeout(() => {
                dispatch( clearErrorMessage );
            }, 10);
        }

    }

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
        verificarUsuario,
        startUpdate
    }
}