import { useEffect, useState } from 'react'

import '../../css/FirstStepPage.css'
import '../../css/colores.css'
import { MapsApp } from '../../maps/MapsApp';
import { useMapStore, usePackageDeliveryStore, usePlacesStore } from '../../hooks';
import { NextButton, PreviousButton } from './';
import { SearchBar } from '../../maps/components';
import Swal from 'sweetalert2';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const SecondStep = () => {
    const [locationState, setLocationState] = useState("");
    const { userLocation } = usePlacesStore();
    const { map, isMapReady, getRouteBetweenPoints, getRouteMinutes } = useMapStore();
    const { origen, destino, startSetOrigen, startSetDestino, setIncrementStep, setDecrementStep, step } = usePackageDeliveryStore();

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
    }, [userLocation]);

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
        //TODO: MINUTOS
        if (step === 2) {
            // console.log(origen);
            setIncrementStep();
            startSetOrigen(locker);
            //TODO: TRAZAR RUTA SI YA TENEMOS DESTINO
        }
        //* Significa que ya tenemos locker origen
        else if (step === 3) {
            startSetDestino(locker);
            getRouteBetweenPoints(origen.locker_coords, locker.locker_coords).then(([kms, minutes]) => {
                // Swal.fire('Ruta establecida', 
                //     `La ruta es de ${kms} kms con una duración de ${minutes} minutos`, 
                // 'success');
                console.log({ kms, minutes });
            });
        }

    }
    return (
        <div className='container-fluid'>
           
            <div className='formulario'>
            
                <div className='row'>
                    <div className='col-lg-6'>
                        {step === 2 && <p className='fW-700 fZ'>Selecciona la ubicación de origen de tu paquete</p>}
                        {step === 3 && <p className='fW-700 fZ'>Selecciona la ubicación de destino de tu paquete</p>}
                    </div>
                    <div className='col-lg-6'>

                        <SearchBar className="form-select ubicacion" />



                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-6'>
                        {/* <img className='mapa-img' height={400} width={500} src='/img/Mapa.png'></img> */}
                        <MapsApp />
                        {/*   <i className="fa-solid fa-location-dot satelite" id='Satelite'></i>
                            <i className="fa-solid fa-location-dot santa-fe" id='SantaFe'></i>
                            <i className="fa-solid fa-location-dot colValle" id='ColValle'></i>
                            <i className="fa-solid fa-location-dot coyoacan" id='Coyoacan'></i> */}
                        {/* <button 
                            type="button" 
                            className="btn btn-sig1" 
                            id='regresar-btn'
                            onClick={setDecrementStep}
                        >
                            Regresar
                        </button> */}
                        <PreviousButton />
                    
                        <Link to="/" className='btn btn-sig2 ms-5'>Cancelar</Link>
                       
                    </div>
                    <div className='col-lg-6 center'>
                        <div className='row borde'>
                            <div className='col-lg-3'></div>
                            <div className='col-lg-3'>
                                <p className='fW-700 '>Ubicación</p>
                            </div>
                            <div className='col-lg-3 '>
                                <p className='fW-700'>Disponibles</p>
                            </div>
                            <div className='col-lg-3'></div>
                        </div>
                        {
                            lockers.map(locker => (

                                <div className='row mt-1 mb-3' key={locker.id}>
                                    <div className='col-lg-3'>
                                        <i className="fa-solid fa-building" id={locker.locker_name}></i>
                                        {!origen && <small>A {locker.minutes} minutos</small>}
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
                                            className="btn btn-gris mb-2"
                                        // w-20 btn btn-lg btn-sig
                                        >
                                            Seleccionar
                                        </button>
                                    </div>
                                    <hr className='tabla' />
                                </div>

                            ))
                        }
                        {
                            destino && <input
                                className="w-20 btn btn-lg btn-sig"
                                onClick={setIncrementStep}
                                type="button"
                                value="Siguiente" />
                        }

                    </div>
                </div>

            </div>
        </div>
    )


}
