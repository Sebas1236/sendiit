import { useEffect, useLayoutEffect, useRef } from "react";
import { usePlacesStore, useMapStore } from "../../../hooks"
import { Map } from 'mapbox-gl';
import { featureCollection, point } from '@turf/turf';
import '../../../styles.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loading } from "../../../maps/components";
export const RouteMap = () => {

    const { isLoading, userLocation, places } = usePlacesStore();
    const { setMap, setMarker } = useMapStore();
    const mapDiv = useRef(null);

    //*TURF

    useEffect(() => {
        setMarker();
    }, [places])

    /* Nos esperamos a que el componente cargue */
    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current, // container ID
                style: 'mapbox://styles/mapbox/light-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 10, // starting zoom
            });
            setMap(map);
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    //TODO: LIMPIAR POLYLINE
    //TODO: NEW MARKERS
    return (
        <div ref={mapDiv}
            style={{
                // backgroundColor: 'red',
                height: '80vh',
                left: 0,
                position: 'relative',
                top: 0,
                width: '100vh',
            }}
        >
            {
                userLocation?.join(',')
            }
        </div>
    )
}
