import { useEffect } from "react";
import { useMapStore, usePlacesStore } from "../../hooks"

export const DisplayLockers = () => {
    const { userLocation, isLoading } = usePlacesStore();
    const { getRouteMinutes } = useMapStore();
    const coords = [
        [-99.162953, 19.374037], //* Del valle
        [-99.234005, 19.510558], //* Satélite
        [-99.179423, 19.345436], //* Coyoaán
        [-99.264389, 19.365604] //* Santa Fe
    ];

    //TODO: SORT EN REACT TABLES AL DESPLEGAR LOS LOCKERS
    // useEffect(() => {
    //     if (userLocation || !isLoading) {
    //         for (const coord of coords) {
    //             getRouteMinutes(userLocation, coord);
    //         }
    //     }
    // }, [ isLoading ])


    return (

        <div>
        </div>
    )
}
