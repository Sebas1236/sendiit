import '../css/routestyles.css'
import mapboxgl, { Map } from 'mapbox-gl';
import { usePlacesStore, useMapStore, useLockerStore, useRouteMapStore } from '../../../hooks';
import { useEffect, useLayoutEffect, useRef } from "react";
// import '../../styles.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loading } from '../../../maps/components';

export const StartMap = () => {
    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2ViYXMxMjM2IiwiYSI6ImNsYmlyeWVpNTBhYTQzcG54cTRoenhpZ3QifQ.BFA6ei27WaRWEQRBknO62Q"
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const { isLoading, userLocation, places } = usePlacesStore();
    const { setMap, setMarker, map } = useMapStore();
    const { setRouteMap } = useRouteMapStore();
    const { lockers } = useLockerStore();

    const mapDiv = useRef(null);
    // console.log(lockers);

    // useEffect(() => {
    //     setMarker();
    // }, [places]);

    /* Nos esperamos a que el componente cargue */
    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current, // container ID
                style: 'mapbox://styles/mapbox/light-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 13, // starting zoom
                // scrollZoom: false,
            });
            setRouteMap(map);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className='sidebar'>
                <div className='heading'>
                    <h1>Nuestras sucursales</h1>
                </div>
                <div id='listings' className='listings'></div>
            </div>
            <div ref={mapDiv} id="mapDiv" className="map"></div>
        </>
    )
}
