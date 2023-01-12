import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { MapsApp } from './MapsApp'
import { store } from './store/store';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { getEnvVariables } from '../helpers';
 
const MAPBOX_ACCESS_TOKEN="YOUR ACCESS TOKEN"
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

//PERMISO PARA GEOLOCALIZACIÓN
if (!navigator.geolocation) {
  alert('Tu navegador no tiene opción de Geolocation');
  throw new Error('Tu navegador no tiene opción de Geolocation');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MapsApp />
    </Provider>
  </React.StrictMode>
)
