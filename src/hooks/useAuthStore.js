// Objetivo realizar interacción con auth en store

import { useDispatch, useSelector } from "react-redux"
import sendiitApi from "../api/sendiitApi";
import { clearErrorMessage, onChecking, onLoadUser, onLogin, onLogout, onLogoutCard, onLogoutPackage, onLogoutPackageDelivery } from "../store";

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
            dispatch( onLogin({ name: data.name, uid: data.uid, last_name: data.last_name, email: data.email, phone: data.phone, role: data.role }) );

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
            dispatch( onLogin({ name: data.name, uid: data.uid, last_name: data.last_name, email: data.email, phone: data.phone, role: data.role }) );
        } catch (error) {
            //El token ya no funciona
            localStorage.clear();
            dispatch( onLogout() );
        }
    };

    //* OBTIENE LOS DATOS DE LA BD
    //TODO: CHECAR UID EN EL STORE
    const startLoadingUser = async() => {

        try {
            const { data } = await sendiitApi.get('/user');
            // console.log(data);
            // console.log({uid});
            //TODO VERIFICAR LIBRE DE ERRORES
            dispatch(onLoadUser({ ...data.usuario, uid: data.usuario._id }));
        } catch (error) {
            console.log('Error cargando usuario');
            console.log(error);
        }
    };
    
    const startUserUpdate = async({ uid, name, last_name, phone }) => {
        try {
            const { data } = await sendiitApi.post('/user/profile', { uid, name, last_name, phone });
        } catch (error) {
            console.log('Error actualizando usuario');
            console.log(error);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCard() );
        dispatch( onLogout() );
        dispatch( onLogoutPackage() );
        dispatch( onLogoutPackageDelivery() );
    }

		//Clear error message
		const clearErrorMessage2 = () => {
			dispatch( clearErrorMessage() );
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
        startLoadingUser,
        startUserUpdate,
				clearErrorMessage2,
    }
}