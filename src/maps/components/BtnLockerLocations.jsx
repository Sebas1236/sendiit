import { useEffect } from "react";
import { useMapStore, usePackageDeliveryStore, usePlacesStore } from "../../hooks";

export const BtnLockerLocations = () => {

    const { userLocation } = usePlacesStore();
    const { map, isMapReady, getRouteBetweenPoints, getRouteMinutes } = useMapStore();
    const { origen, destino, startSetOrigen, startSetDestino } = usePackageDeliveryStore();

    const lockers = [
        {
            id: 1,
            locker_name: 'Del Valle',
            locker_availability: 10,
            locker_coords: [-99.162953, 19.374037],
            minutes: 42,
        },
        {
            id: 2,
            locker_name: 'Satélite',
            locker_availability: 10,
            locker_coords: [-99.234005, 19.510558],
            minutes: 26,
        },
        {
            id: 3,
            locker_name: 'Coyoacán',
            locker_availability: 10,
            locker_coords: [-99.179423, 19.345436],
            minutes: 56,
        },
        {
            id: 4,
            locker_name: 'Santa Fe',
            locker_availability: 10,
            locker_coords: [-99.264389, 19.365604],
            minutes: 55,
        },
    ];

    useEffect(() => {
        if (userLocation) {
            for (const locker of lockers) {
                getRouteMinutes(userLocation, locker.locker_coords).then((minutes) => {
                    locker.minutes = minutes;
                });
            }
        }
    }, [userLocation])


    const onClick = (locker) => {
        //1. El mapa está listo
        if (!isMapReady) throw new Error('Mapa no está listo');
        if (!userLocation) throw new Error('No hay ubicación de locker');
        //2. Saber la ubicación del locker
        map?.flyTo({
            zoom: 14,
            center: locker.locker_coords,
        });
        //* Significa que estamos estableciendo el origen

        if (!origen) {
            console.log(origen);
            startSetOrigen(locker);
        }
        //* Significa que ya tenemos locker origen
        else if (!destino) {
            startSetDestino(locker);
            getRouteBetweenPoints(origen.locker_coords, locker.locker_coords);
        }

    }
    // TODO: MINUTOS DE UBICACIÓN DESTINO
    return (

        <div className="btn-group-vertical" role="group" aria-label="Basic example">

            {
                origen ? <h3>Elegir locker destino</h3> : <h3>Elegir locker origen</h3>
            }

            {
                // <div key={locker.id}>
                //     <button
                //         type="button"
                //         className="btn btn-primary"
                //         onClick={() => onClick(locker)}
                //     >
                //         {locker.locker_name}
                //     </button>
                //     <br/>
                //     { !origen && <small>A {locker.minutes} minutos de tu ubicación</small>}
                // </div>
                lockers.map(locker => (

                    <div className='row' key={locker.id}>
                        <div className='col-lg-3'>
                            <i className="fa-solid fa-building" id='coyoacan'></i>
                        </div>

                        <div className='col-lg-3'>
                            {locker.locker_name}
                        </div>

                        <div className='col-lg-3'>
                            {locker.locker_availability}
                        </div>

                        <div className='col-lg-3'>
                            <button
                                type="button"
                                onClick={() => onClick(locker)}
                                className="btn btn-sig1"
                            >
                                Siguiente
                            </button>
                        </div>
                        <hr className='tabla' />
                    </div>

                ))
            }
        </div>
    )
}
