import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { distance } from '@turf/turf';
import { Marker, Popup } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import { getLockersGeoJSON } from "../helpers/getLockersGeoJSON";
import { mapReducer } from '../store/maps/mapSlice';

export const useRouteMapStore = () => {
    const { userLocation } = useSelector(state => state.places);
    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2ViYXMxMjM2IiwiYSI6ImNsYmlyeWVpNTBhYTQzcG54cTRoenhpZ3QifQ.BFA6ei27WaRWEQRBknO62Q"
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const dispatch = useDispatch();
    const { lockersgeojson } = getLockersGeoJSON();

    const flyToStore = (map, currentFeature) => {
        map?.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
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

        function addMarkers() {
            /* For each feature in the GeoJSON object above: */
            for (const marker of lockersgeojson.features) {
                /* Create a div element for the marker. */
                const el = document.createElement('div');
                /* Assign a unique `id` to the marker. */
                el.id = `marker-${marker.properties.id}`;
                /* Assign the `marker` class to each marker for styling. */
                el.className = 'marker';

                /**
                 * Create a marker using the div element
                 * defined above and add it to the map.
                 **/
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
                    const listing = document.getElementById(`listing-${marker.properties.id}`);
                    listing.classList.add('active');
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


            addMarkers();

            dispatch(mapReducer(map));

            // buildLocationList(lockersgeojson);
        });
    }
    return {
        //*Propiedades
        //*Métodos
        setRouteMap,
    }
}
