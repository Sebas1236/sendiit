import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { store } from './store'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

const MAPBOX_ACCESS_TOKEN="pk.eyJ1Ijoic2ViYXMxMjM2IiwiYSI6ImNsYmlyeWVpNTBhYTQzcG54cTRoenhpZ3QifQ.BFA6ei27WaRWEQRBknO62Q";
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
