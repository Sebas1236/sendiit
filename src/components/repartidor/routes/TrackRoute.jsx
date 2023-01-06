// import '../css/trackRoute.css'
import '../css/routestyles.css'
import mapboxgl, { Map } from 'mapbox-gl';
import { usePlacesStore, useMapStore, useLockerStore, useRouteMapStore, usePackageDeliveryStore, usePackageStore } from '../../../hooks';
import { useEffect, useLayoutEffect, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loading } from '../../../maps/components';
import Swal from 'sweetalert2';
import { ImageComponent } from '../ImageComponent';

export const TrackRoute = () => {
    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2ViYXMxMjM2IiwiYSI6ImNsYmlyeWVpNTBhYTQzcG54cTRoenhpZ3QifQ.BFA6ei27WaRWEQRBknO62Q"
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const { isLoading, userLocation, places } = usePlacesStore();
    const { step, setIncrementStep, setStep } = usePackageDeliveryStore();
    const { setMap, setMarker, map } = useMapStore();
    const { packages } = usePackageStore();
    const { setRouteMap, prepareRouteGeneration, startTrip, waypoints, setNewWaypoints } = useRouteMapStore();
    const { lockers } = useLockerStore();

    const mapDiv = useRef(null);
    const { startLoadingAllPackages, isLoadingPackages } = usePackageStore();
    useEffect(() => {
        startLoadingAllPackages();
    }, []);
    /* Nos esperamos a que el componente cargue */
    useLayoutEffect(() => {
        if (!isLoadingPackages) console.log(packages);

        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current, // container ID
                style: 'mapbox://styles/mapbox/light-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 10, // starting zoom
                // scrollZoom: false,
            });
            if (step === 1) {
                //Manda la petición a la API
                prepareRouteGeneration(map);
                console.log(packages);
            }
            if (step >= 2 && step <= 5) {
                // Función que se llama cuando el repartidor da click a 'Empezar ruta'
                if (waypoints) {
                    startTrip(map, waypoints[step - 2].location, waypoints[step - 1].location);
                }
                // console.log(waypoints);
            }
            if (step > 5) {
                Swal.fire('Éxito', 'Ha finalizado su ruta.', 'success');
                // setStep();
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
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
                        <h1>Instrucciones</h1>
                    </div>
                    <div id="reports" className="reports">
                        {/* {packages.map(paquete=>(
                            <h1>hola</h1>
                        ))} */}
                    </div>
                    <div>
                        {
                            // <ImageComponent image={packages[0].qrOrigen}/>
                            // console.log(packages)
                            packages.map(paquete => (
                                <>
                                    {/* <ImageComponent image={paquete.qrOrigen} /> */}
                                    {/* <h2>Recoger los siguientes paquetes: </h2> */}
                                    {
                                        step===2 && paquete.casilleroOrigen.ubicacion === 'satélite' && <ImageComponent image={paquete.qrOrigen} />
                                    }
                                    {/* {step>=3 && <h3>Dejar los siguientes paquetes: </h3>} */}
                                </>
                            ))

                        }

                    </div>
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
                        top: -200,
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
