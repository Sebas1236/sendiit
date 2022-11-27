import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const sendiitApi = axios.create({
    //Servir para no concatenar demasiadas cadenas
    baseURL: VITE_API_URL,
});

// TODO: Configurar interceptores
// Interceptor: Añadir, modificar información a la petición
sendiitApi.interceptors.request.use( config => {
    
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
});

export default sendiitApi;