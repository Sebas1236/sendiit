import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { store } from './store'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

const MAPBOX_ACCESS_TOKEN="pk.eyJ1IjoibWlrZWFuZ2VsbWciLCJhIjoiY2xieTI5MTg1MGZpdzN3cXp3OGM2Nng4aiJ9.XklRA9Rq33REZ0eN46b58w";
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

//PERMISO PARA GEOLOCALIZACIÓN
if (!navigator.geolocation) {
  alert('Tu navegador no tiene opción de Geolocation');
  throw new Error('Tu navegador no tiene opción de Geolocation');
}
export const SendiitApp = () => {
    return (
        <Provider store = { store }>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}
