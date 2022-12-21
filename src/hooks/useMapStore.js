import { LngLatBounds, Marker, Popup } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux"
import directionsApi from "../api/directionsApi";
import { mapReducer, setMarkers } from '../store/maps/mapSlice';

export const useMapStore = () => {
    const { isMapReady, map, markers } = useSelector(state => state.map);
    const { places } = useSelector(state => state.places);
    const dispatch = useDispatch();

    //TODO: MEJORAR (OBTENER DEL BACKEND Y HACERLO CON FOR)
    const setMap = (map) => {

        const myLocationPopup = new Popup()
            .setHTML(`
                <h4>Aquí estoy</h4>
                <p>En algún lugar del mundo</p>
            `)

        //Creamos un marcador
        new Marker({
            // color: '#e41f1a'
            color: '#212e46'
            // color: '#f9d950'
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map);

        //*GARDEN SANTA FE
        const santaFe = new Popup()
            .setHTML(`
            <h4>Sendiit Santa Fe</h4>
            <p>Garden Santa Fe, Guillermo González Camarena 1205, Ciudad de México, 01376, México</p>
            <img width="200" height="100" src="src/maps/images/garden-santafe.jpg"/>
        `)

        //Creamos un marcador
        new Marker({
            color: '#e41f1a'
            // color: '#f9d950'
        })
            .setLngLat([-99.264389, 19.365604])
            .setPopup(santaFe)
            .addTo(map);

        //*Oasis Coyoacán, Miguel Ángel de Quevedo 217, Ciudad de México, 04310, México
        const coyoacan = new Popup()
            .setHTML(`
        <h4>Sendiit Coyoacán</h4>
        <p>Oasis Coyoacán, Miguel Ángel de Quevedo 217, Ciudad de México, 04310, México</p>
        <img width="200" height="100" src="src/maps/images/coyoacan.jpg"/>
        `)

        //Creamos un marcador
        new Marker({
            color: '#e41f1a'
            // color: '#f9d950'
        })
            .setLngLat([-99.179423, 19.345436])
            .setPopup(coyoacan)
            .addTo(map);

        //* Plaza Satélite
        const satelite = new Popup()
            .setHTML(`
    <h4>Sendiit Satélite</h4>
    <p>Plaza Satélite, Circuito Centro Comercial 2251, Naucalpan de Juárez, Estado de México 53100, México</p>
    <img width="200" height="100" src="src/maps/images/satelite.jfif"/>
    `)

        //Creamos un marcador
        new Marker({
            color: '#e41f1a'
            // color: '#f9d950'
        })
            .setLngLat([-99.234005, 19.510558])
            .setPopup(satelite)
            .addTo(map);
        //* Garden del Valle
        const delValle = new Popup()
            .setHTML(`
                <h4>Sendiit Del Valle</h4>
                <p>Garden Del Valle, 767 Avenida Universidad, Ciudad de México, 03104, México</p>
                <img width="200" height="100" src="src/maps/images/delvalle.jpg"/>
            `)

        //Creamos un marcador
        new Marker({
            color: '#e41f1a'
            // color: '#f9d950'
        })
            .setLngLat([-99.162953, 19.374037])
            .setPopup(delValle)
            .addTo(map);

        dispatch(mapReducer(map));

    }

    const setMarker = () => {
        markers.forEach(marker => marker.remove());
        const newMarkers = [];

        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${place.text_es}</h6>
                    <p>${place.place_name_es}</p>
                `);

            const newMarker = new Marker({
                // color: '#e41f1a'
                color: '#f9d950',
            })
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(map);

            newMarkers.push(newMarker);
        }
        //TODO: LIMPIAR POLYLINE
        dispatch(setMarkers(newMarkers));
    }

    const getRouteMinutes = async (start, end) => {
        const resp = await directionsApi.get(`/${start.join(',')};${end.join(',')}`);
        const { distance, duration } = resp.data.routes[0];
        const minutes = Math.floor(duration / 60);
        // console.log({minutes});
        return minutes;
    }

    const getRouteBetweenPoints = async (start, end) => {
        const resp = await directionsApi.get(`/${start.join(',')};${end.join(',')}`);
        // console.log(end);
        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates: coords } = geometry;
        let kms = distance / 1000;
        kms = Math.round(kms * 100);
        kms /= 100;

        const minutes = Math.floor(duration / 60);
        console.log({ kms, minutes });
        const bounds = new LngLatBounds(
            start,
            start,
        );

        for (const coord of coords) {
            const newCoord = [coord[0], coord[1]];
            bounds.extend(newCoord);
        }

        //Para que se ajuste a la pantalla
        map?.fitBounds(bounds, {
            padding: 200
        });

        //* Polyline
        const sourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords,
                        }
                    }
                ]
            }
        }
        //*Remover polyline
        if (map.getLayer('RouteString')) {
            map.removeLayer('RouteString');
            map.removeSource('RouteString');
        }
        map?.addSource('RouteString', sourceData);
        map.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#212e46',
                // 'line-color': '#f9d950',
                'line-width': 3
            }
        })

        return [ kms, minutes ];
    }

    return {
        //* Propiedades
        isMapReady,
        map,
        markers,
        //* Métodos
        setMap,
        setMarker,
        getRouteBetweenPoints,
        getRouteMinutes,
    }
}