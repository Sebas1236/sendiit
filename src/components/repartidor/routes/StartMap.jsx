import '../css/routestyles.css'
import mapboxgl, { Map } from 'mapbox-gl';
import { usePlacesStore, useMapStore, useLockerStore, useRouteMapStore, usePackageDeliveryStore } from '../../../hooks';
import { useEffect, useLayoutEffect, useRef } from "react";
// import '../../styles.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loading } from '../../../maps/components';

export const StartMap = () => {
    const MAPBOX_ACCESS_TOKEN = "YOUR ACCESS TOKEN"
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const { isLoading, userLocation } = usePlacesStore();
    const { setMap, setMarker, map } = useMapStore();
    const { setRouteMap, prepareRouteGeneration, startTrip, waypoints, setNewWaypoints } = useRouteMapStore();
    const { step, setIncrementStep } = usePackageDeliveryStore();

    const mapDiv = useRef(null);
    /* Nos esperamos a que el componente cargue */
    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current, // container ID
                style: 'mapbox://styles/mapbox/light-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 8, // starting zoom
                // scrollZoom: false,
            });
            setRouteMap(map);
            // console.log(waypoints);
            // Esta función se llama cuando el repartidor da click a 'Ver ruta'
            if (step === 1) {
                prepareRouteGeneration(map);
            }
            // if ( step === 2 ){
            //     // Función que se llama cuando el repartidor da click a 'Empezar ruta'
            //     startTrip(map);
            //     console.log(waypoints);
            // }
        }
    }, [isLoading, step]);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <>

            <div className="row">
                <div className="col-lg-6">
                    <div className="heading">
                        <h1>Nuestras sucursales</h1>
                    </div>
                    <div id="listings" className="listings"></div>
                    {/* <div id='listings' className='listings'></div> */}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div ref={mapDiv} id="mapDiv" className="map" style={{
                        // backgroundColor: 'red',
                        height: '100vh',
                        left: '100%',
                        position: 'relative',
                        textAlign: 'center',
                        top: -583,
                        width: '120vh',
                    }}></div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">

                </div>
            </div>
        </>
    )
}
