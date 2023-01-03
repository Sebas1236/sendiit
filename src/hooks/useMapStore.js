import { LngLatBounds, Marker, Popup } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux"
import directionsApi from "../api/directionsApi";
import { mapReducer, setMarkers } from '../store/maps/mapSlice';
import { featureCollection, point } from '@turf/turf';


export const useMapStore = () => {
    const { isMapReady, map, markers } = useSelector(state => state.map);
    const { places, userLocation } = useSelector(state => state.places);
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    //* TURF
    const truckLocation = [-99.162953, 19.374037]; //Del Valle
    const warehouseLocation = [-99.0970509, 19.4751135];
    const lastAtRestaurant = 0;
    let keepTrack = [];
    const pointHopper = {};
    const dropoffs = featureCollection([]);
    const nothing = featureCollection([]);
    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2ViYXMxMjM2IiwiYSI6ImNsYmlyeWVpNTBhYTQzcG54cTRoenhpZ3QifQ.BFA6ei27WaRWEQRBknO62Q"
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

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


        if (status === 'Repartidor') {
            //*TURF
            // Here you'll specify all the parameters necessary for requesting a response from the Optimization API
            const assembleQueryURL = () => {
                // Store the location of the truck in a constant called coordinates
                const coordinates = [truckLocation];
                const restaurantIndex = coordinates.length;
                const distributions = [];
                keepTrack = [truckLocation];

                // Create an array of GeoJSON feature collections for each point
                const restJobs = Object.keys(pointHopper).map((key) => pointHopper[key]);

                // If there are any orders from this restaurant
                if (restJobs.length > 0) {
                    // Check to see if the request was made after visiting the restaurant
                    const needToPickUp =
                        restJobs.filter((d) => {
                            return d.properties.orderTime > lastAtRestaurant;
                        }).length > 0;

                    // If the request was made after picking up from the restaurant,
                    // Add the restaurant as an additional stop
                    if (needToPickUp) {

                        // Add the restaurant as a coordinate
                        coordinates.push(warehouseLocation);
                        // push the restaurant itself into the array
                        keepTrack.push(pointHopper.warehouse);
                    }

                    for (const job of restJobs) {
                        // Add dropoff to list
                        keepTrack.push(job);
                        coordinates.push(job.geometry.coordinates);
                        // if order not yet picked up, add a reroute
                        if (needToPickUp && job.properties.orderTime > lastAtRestaurant) {
                            distributions.push(`${restaurantIndex},${coordinates.length - 1}`);
                        }
                    }
                }

                // Set the profile to `driving`
                // Coordinates will include the current location of the truck,
                return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates.join(
                    ';'
                )}?distributions=${distributions.join(
                    ';'
                )}&overview=full&steps=true&geometries=geojson&source=first&access_token=${mapboxgl.accessToken
                    }`;
            }
            const newDropoff = async (coordinates) => {
                // Store the clicked point as a new GeoJSON feature with
                // two properties: `orderTime` and `key`
                const pt = point([coordinates.lng, coordinates.lat], {
                    orderTime: Date.now(),
                    key: Math.random()
                });
                dropoffs.features.push(pt);
                pointHopper[pt.properties.key] = pt;

                // Make a request to the Optimization API
                const query = await fetch(assembleQueryURL(), { method: 'GET' });
                const response = await query.json();

                // Create an alert for any requests that return an error
                if (response.code !== 'Ok') {
                    const handleMessage =
                        response.code === 'InvalidInput'
                            ? 'Refresh to start a new route. For more information: https://docs.mapbox.com/api/navigation/optimization/#optimization-api-errors'
                            : 'Try a different point.';
                    alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
                    // Remove invalid point
                    dropoffs.features.pop();
                    delete pointHopper[pt.properties.key];
                    return;
                }
                // Create a GeoJSON feature collection
                const routeGeoJSON = turf.featureCollection([
                    turf.feature(response.trips[0].geometry)
                ]);
                // Update the `route` source by getting the route source
                // and setting the data equal to routeGeoJSON
                map.getSource('route').setData(routeGeoJSON);
            }

            const updateDropoffs = (geojson) => {
                map.getSource('dropoffs-symbol').setData(geojson);
            }



            const addWaypoints = async (event) => {
                // console.log(map.unproject(event.point));
                await newDropoff(map.unproject(event.point));
                updateDropoffs(dropoffs);
            };

            const warehouse = featureCollection([point(warehouseLocation)]);

            map.on('load', async () => {

                map.addLayer({
                    id: 'warehouse',
                    type: 'circle',
                    source: {
                        data: warehouse,
                        type: 'geojson'
                    },
                    paint: {
                        'circle-radius': 20,
                        'circle-color': 'white',
                        'circle-stroke-color': '#3887be',
                        'circle-stroke-width': 3
                    }
                });

                // Create a symbol layer on top of circle layer
                map.addLayer({
                    id: 'warehouse-symbol',
                    type: 'symbol',
                    source: {
                        data: warehouse,
                        type: 'geojson'
                    },
                    layout: {
                        // 'icon-image': 'grocery-15',
                        'icon-size': 1
                    },
                    paint: {
                        'text-color': '#3887be'
                    }
                });

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
                await map.on('click', addWaypoints);
            })
        }

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

        return [kms, minutes];
    }

    return {
        //* Propiedades
        isMapReady,
        map,
        markers,
        //* Métodos
        setMap,
        // setRouteMap,
        setMarker,
        getRouteBetweenPoints,
        getRouteMinutes,

    }
}