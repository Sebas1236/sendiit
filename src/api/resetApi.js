import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { HOST_API_URL } = getEnvVariables();

const resetApi = axios.create({
    //Servir para no concatenar demasiadas cadenas
    //TODO: SOLUCIONAR ERROR AL OBTENER LA RUTA DE LAS VARIABLES DE ENTORNO
    baseURL: 'http://localhost:4000',
});

// TODO: Configurar interceptores
// Interceptor: Añadir, modificar información a la petición
resetApi.interceptors.request.use( config => {
    
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
});

export default resetApi;