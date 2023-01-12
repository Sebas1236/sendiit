import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { distance, featureCollection, feature, point, booleanDisjoint, buffer } from '@turf/turf';
import mapboxgl, { Marker, Popup } from "mapbox-gl";
import { mapReducer, setWaypoints } from '../store/maps/mapSlice';
// import * as MapboxDirections from '@mapbox/mapbox-gl-directions';
import { useDispatch, useSelector } from "react-redux";
import { getLockersGeoJSON } from "../helpers/getLockersGeoJSON";

export const useRouteMapStore = () => {
    const { userLocation } = useSelector(state => state.places);
    const { waypoints } = useSelector(state => state.map);
    const { step } = useSelector(state => state.packageDelivery);
    const MAPBOX_ACCESS_TOKEN = YOURACCESSTOKEN
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const dispatch = useDispatch();
    const { lockersgeojson } = getLockersGeoJSON();

    const flyToStore = (map, currentFeature) => {
        map?.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 14,
        });
    }

    const createPopUp = (map, currentFeature) => {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();

        const popup = new Popup({ closeOnClick: true })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(`
            <h3>Sendiit</h3>
            <h4>${currentFeature.properties.address.slice(7)}</h4>
            <img width="200" height="100" src="src/maps/images/${currentFeature.properties.image}"/>
            `)
            // .setHTML(`<h3>Sendiit</h3><h4>${currentFeature.properties.address}</h4>`)
            .addTo(map);
    };

    const addMarkers = (map) => {
        /* For each feature in the GeoJSON object above: */
        for (const marker of lockersgeojson.features) {
            /* Create a div element for the marker. */
            const el = document.createElement('div');
            /* Assign a unique `id` to the marker. */
            el.id = `marker-${marker.properties.id}`;
            /* Assign the `marker` class to each marker for styling. */
            el.className = 'marker';

            //* Crear un marcador usando el elemento div y añadirlo al mapa
            new Marker(el, { offset: [0, -23] })
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);

            el.addEventListener('click', (e) => {
                /* Fly to the point */
                flyToStore(map, marker);
                /* Close all other popups and display popup for clicked store */
                createPopUp(map, marker);
                /* Highlight listing in sidebar */
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                try {
                    const listing = document.getElementById(`listing-${marker.properties.id}`);
                    listing.classList.add('active');
                } catch (error) {
                    console.log('No hay listing');
                }

            });
        }
    }

    const setRouteMap = (map) => {
        const myLocationPopup = new Popup()
            .setHTML(`
            <h3>Mi ubicación</h3>
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

        lockersgeojson.features.forEach(function (locker, i) {
            locker.properties.id = i;
        });

        const buildLocationList = (stores) => {
            for (const store of stores.features) {
                /* Add a new listing section to the sidebar. */
                const listings = document.getElementById('listings');
                const listing = listings.appendChild(document.createElement('div'));
                /* Assign a unique `id` to the listing. */
                listing.id = `listing-${store.properties.id}`;
                /* Assign the `item` class to each listing for styling. */
                listing.className = 'item';

                /* Add the link to the individual listing created above. */
                const link = listing.appendChild(document.createElement('a'));
                link.href = '#';
                link.className = 'title';
                link.id = `link-${store.properties.id}`;
                link.innerHTML = `${store.properties.address}`;

                /* Add details to the individual listing. */
                const details = listing.appendChild(document.createElement('div'));
                details.innerHTML = `${store.properties.city}`;
                if (store.properties.phone) {
                    details.innerHTML += ` · ${store.properties.phoneFormatted}`;
                }
                if (store.properties.distance) {
                    const roundedDistance = Math.round(store.properties.distance * 100) / 100;
                    details.innerHTML += `<div><strong>${roundedDistance} kms de distancia</strong></div>`;
                    // console.log(roundedDistance);
                }

                link.addEventListener('click', function () {
                    for (const feature of stores.features) {
                        if (this.id === `link-${feature.properties.id}`) {
                            flyToStore(map, feature);
                            createPopUp(map, feature);
                        }
                    }
                    const activeItem = document.getElementsByClassName('active');
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    this.parentNode.classList.add('active');
                });
            }
        }

        function getBbox(sortedStores, storeIdentifier, searchResult) {
            const lats = [
                sortedStores.features[storeIdentifier].geometry.coordinates[1],
                // searchResult.coordinates[1]
                userLocation[1],
            ];
            const lons = [
                sortedStores.features[storeIdentifier].geometry.coordinates[0],
                userLocation[0],
            ];
            const sortedLons = lons.sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a.distance < b.distance) {
                    return -1;
                }
                return 0;
            });
            const sortedLats = lats.sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a.distance < b.distance) {
                    return -1;
                }
                return 0;
            });
            return [
                [sortedLons[0], sortedLats[0]],
                [sortedLons[1], sortedLats[1]]
            ];
        }
        map.on('load', () => {
            map.addSource('places', {
                type: 'geojson',
                data: lockersgeojson,
            });
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken, // Set the access token
                mapboxgl: mapboxgl, // Set the mapbox-gl instance
                marker: true, // Use the geocoder's default marker style
                bbox: [-99.162953, 19.510558, -99.264389, 19.345436] // Set the bounding box coordinates
            });

            geocoder.on('result', (event) => {
                const searchResult = event.result.geometry;
                const options = { units: 'miles' };
                for (const store of lockersgeojson.features) {
                    store.properties.distance = distance(
                        userLocation,
                        store.geometry,
                        options
                    );
                }
                lockersgeojson.features.sort((a, b) => {
                    if (a.properties.distance > b.properties.distance) {
                        return 1;
                    }
                    if (a.properties.distance < b.properties.distance) {
                        return -1;
                    }
                    return 0; // a debe ser igual a b
                });
                const listings = document.getElementById('listings');
                while (listings.firstChild) {
                    listings.removeChild(listings.firstChild);
                }
                buildLocationList(lockersgeojson);
                const activeListing = document.getElementById(
                    `listing-${lockersgeojson.features[0].properties.id}`
                );
                activeListing.classList.add('active');
                const bbox = getBbox(lockersgeojson, 0, searchResult);
                map.fitBounds(bbox, {
                    padding: 100
                });

                createPopUp(map, lockersgeojson.features[0]);
            });

            // map.addControl(geocoder, 'top-left');
            const options = { units: 'kilometers' };
            for (const store of lockersgeojson.features) {
                store.properties.distance = distance(
                    userLocation,
                    store.geometry,
                    options
                );
            }
            lockersgeojson.features.sort((a, b) => {
                if (a.properties.distance > b.properties.distance) {
                    return 1;
                }
                if (a.properties.distance < b.properties.distance) {
                    return -1;
                }
                return 0; // a must be equal to b
            });
            const listings = document.getElementById('listings');
            while (listings.firstChild) {
                listings.removeChild(listings.firstChild);
            }
            buildLocationList(lockersgeojson);
            const activeListing = document.getElementById(
                `listing-${lockersgeojson.features[0].properties.id}`
            );
            activeListing.classList.add('active');
            const bbox = getBbox(lockersgeojson, 0, userLocation);
            map.fitBounds(bbox, {
                padding: 100
            });

            createPopUp(map, lockersgeojson.features[0]);

            addMarkers(map);

            dispatch(mapReducer(map));
            // buildLocationList(lockersgeojson);
        });
    };

    //* Función para generar la ruta optimizada entre los lockers que visitará el repartidor
    const prepareRouteGeneration = (map) => {
        //* 1. Buscar locker más cercano al repartidor. Ya se encuentran ordenados en setRouteMap
        const nearestLocker = lockersgeojson[0];
        // console.log(nearestLocker);
        //* 2. Optimization API (entre 2-12 puntos). La petición recibe como parámetros:
        /*
            - profile. Modo de transporte (driving-traffic, driving, cycling)
            - coordinates. Lista separada por ; de {longitud},{latitud} coordenadas entre 2 y 12. La primer coordenada
            es el principio y final de la ruta por default.
            Parámetros opcionales:
            - distributions. El primero indica el pickup y el segundo número del drop-off. No pueden ser iguales
            - overview. Tipo de overview geometry a retornar
            - steps. Turn by turn instructions
            - geometries. Formato en que retorna la geometry. En este caso GJSON data
            - source. En qué coordenadas empezar la ruta
        */
        //*TURF
        // Parámetros para la petición a la Optimization API
        const dropoffs = featureCollection([]);
        const nothing = featureCollection([]);
        const pointHopper = {};
        const assembleQueryURL = () => {
            // Viaje ida - vuelta, el inicio es la ubicación del repartidor
            const coordinates = [userLocation, [-99.162953, 19.374037], [-99.234005, 19.510558], [-99.179423, 19.345436], [-99.264389, 19.365604]];
            const distributions = [];
            let keepTrack = [];
            keepTrack = [userLocation];

            // Coordenadas incluirán la localización actual del camión,
            //* Roundtrip es para ver si regresa al mismo punto de origen
            return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates.join(
                ';'
            )}?&roundtrip=false&destination=last&overview=full&steps=true&geometries=geojson&source=first&access_token=${mapboxgl.accessToken}`;
        }
        const newDropoff = async () => {
            // Petición a la Optimization API
            const query = await fetch(assembleQueryURL(), { method: 'GET' });
            const response = await query.json();

            // Alerta por si hay error
            if (response.code !== 'Ok') {
                const handleMessage =
                    response.code === 'InvalidInput'
                        ? 'Recargar para una nueva ruta. '
                        : 'Intente un punto distinto.';
                alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
            }
            //* waypoint index
            let sortedWaypoints = response.waypoints;
            sortedWaypoints.sort((a, b) => a.waypoint_index - b.waypoint_index);
            dispatch(setWaypoints(sortedWaypoints));
            // Create a GeoJSON feature collection
            const routeGeoJSON = featureCollection([
                feature(response.trips[0].geometry)
            ]);
            // Update the `route` source by getting the route source
            // and setting the data equal to routeGeoJSON
            map.getSource('route').setData(routeGeoJSON);
        }

        const addWaypoints = async () => {
            await newDropoff();
        };

        map.on('load', async () => {

            map.addSource('route', {
                type: 'geojson',
                data: nothing
            });

            map.addLayer(
                {
                    id: 'routearrows',
                    type: 'symbol',
                    source: 'route',
                    layout: {
                        'symbol-placement': 'line',
                        'text-field': '▶',
                        'text-size': ['interpolate', ['linear'], ['zoom'], 12, 24, 22, 60],
                        'symbol-spacing': ['interpolate', ['linear'], ['zoom'], 12, 30, 22, 160],
                        'text-keep-upright': false
                    },
                    paint: {
                        'text-color': '#3887be',
                        'text-halo-color': 'hsl(55, 11%, 96%)',
                        'text-halo-width': 3
                    }
                },
                'waterway-label'
            );

            map.addLayer(
                {
                    id: 'routeline-active',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 3, 22, 12]
                    }
                },
                'waterway-label'
            );

            map.addLayer({
                id: 'dropoffs-symbol',
                type: 'symbol',
                source: {
                    data: dropoffs,
                    type: 'geojson'
                },
                layout: {
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true,
                    // 'icon-image': 'marker-15'
                }
            });
            //*Listen for a click on the map
            await addWaypoints();
            // await map.on('click', addWaypoints);
        })

        dispatch(mapReducer(map));
    }

    const startTrip = (map, origen = [], destino = [], routeWaypoints = []) => {
        //Recibe: Waypoint 0, 1, 2, 3, coordenadas de las ubicaciones
        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            controls: {
                inputs: true,
                profileSwitcher: false,
            },
            placeholderOrigin: 'Tu ubicación',
            placeholderDestination: 'Sendiit Satélite',
            unit: 'metric',
            profile: 'mapbox/driving',
            alternatives: 'false',
            geometries: 'geojson',
            language: 'es',
        });

        const { clearances } = getLockersGeoJSON();
        const obstacle = buffer(clearances, 0.25, { units: 'kilometers' });
        //TODO: PASAR COMO ORIGEN WAYPOINT 0 Y COMO DESTINO WAYPOINT 1, así consecutivamente
        map.on('load', async () => {
            
            map.addLayer({
                id: 'clearances',
                type: 'fill',
                source: {
                    type: 'geojson',
                    data: obstacle
                },
                layout: {},
                paint: {
                    'fill-color': '#f03b20',
                    'fill-opacity': 0.5,
                    'fill-outline-color': '#f03b20'
                }
            });
            //* Color de las ruta. Ruta principal y alternativas
            for (let i = 0; i < 3; i++) {
                map.addSource(`route${i}`, {
                    type: 'geojson',
                    data: {
                        type: 'Feature'
                    }
                });

                map.addLayer({
                    id: `route${i}`,
                    type: 'line',
                    source: `route${i}`,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#e41f1a',
                        'line-opacity': 0.5,
                        'line-width': 13,
                        'line-blur': 0.5
                    }
                });

            }

            map.scrollZoom.enable();
            map.addControl(directions, 'top-right');
            const language = new MapboxLanguage({
                defaultLanguage: 'es'
            });
            map.addControl(language);


            directions.on('route', (event) => {
                const reports = document.getElementById('reports');
                reports.innerHTML = '';
                const report = reports.appendChild(document.createElement('div'));
                // Add IDs to the routes
                const routes = event.route.map((route, index) => ({
                    ...route,
                    id: index
                }));

                // Hide all routes by setting the opacity to zero.
                for (let i = 0; i < 3; i++) {
                    map.setLayoutProperty(`route${i}`, 'visibility', 'none');
                }

                for (const route of routes) {
                    // Make each route visible, by setting the opacity to 50%.
                    map.setLayoutProperty(`route${route.id}`, 'visibility', 'visible');

                    // Get GeoJSON LineString feature of route
                    const routeLine = polyline.toGeoJSON(route.geometry);

                    // Update the data for the route, updating the visual.
                    map.getSource(`route${route.id}`).setData(routeLine);

                    const isClear = booleanDisjoint(obstacle, routeLine) === true;

                    const collision = isClear ? 'es buena!' : 'es mala.';
                    const emoji = isClear ? '✔️' : '⚠️';
                    const detail = isClear ? 'no va' : 'va';
                    report.className = isClear ? 'item' : 'item warning';

                    if (route.id === 1) {
                        map.setPaintProperty(`route${route.id}`, 'line-color', '#74c476');
                    } else {
                        map.setPaintProperty(`route${route.id}`, 'line-color', '#212e46');
                    }

                    // Add a new report section to the sidebar.
                    // Assign a unique `id` to the report.
                    report.id = `report-${route.id}`;

                    // Add the response to the individual report created above.
                    const heading = report.appendChild(document.createElement('h3'));

                    // Set the class type based on clear value.
                    heading.className = isClear ? 'title' : 'warning';
                    heading.innerHTML = `${emoji} Ruta ${route.id + 1} ${collision}`;

                    // Add details to the individual report.
                    const details = report.appendChild(document.createElement('div'));
                    details.innerHTML = `Esta ruta ${detail} a un área con tráfico.`;
                    report.appendChild(document.createElement('hr'));
                }
            });
            // directions.setOrigin([-99.096341, 19.474828]); 
            // directions.setDestination([-99.232858, 19.510008]);
            console.log(origen);
            directions.setOrigin(origen); 
            directions.setDestination(destino);
            addMarkers(map);
        });
        dispatch(mapReducer(map));
        //* Cambiar status del paquete
        //* Enviar correo al destinatario y remitente
    }

    const setNewWaypoints = (newWaypoints = []) => {
        dispatch(setWaypoints(newWaypoints));
    }

    return {
        //*Propiedades
        waypoints,
        //*Métodos
        setRouteMap,
        prepareRouteGeneration,
        startTrip,
        setNewWaypoints,
    }
}
