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
    const MAPBOX_ACCESS_TOKEN = "YOUR ACCESS TOKEN"
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
                            step === 2 && (<>
                                <h4>Recoger los siguientes paquetes: </h4>
                                <input type="checkbox" /> id: 1 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 2 Tamaño: Pequeño <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 3 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 4 Tamaño: Grande <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                            </>)

                        }
                        {
                            step >= 3 && step<5 && (<>
                                <h4>Recoger los siguientes paquetes: </h4>
                                <input type="checkbox" /> id: 1 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 2 Tamaño: Pequeño <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 3 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 4 Tamaño: Grande <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br/>
                                <h4>Dejar los siguientes paquetes: </h4>
                                <input type="checkbox" /> id: 1 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 2 Tamaño: Pequeño <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 3 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 4 Tamaño: Grande <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                            </>)
                        }
                        {
                            step === 5 &&
                            (
                                <>
                                                                <h4>Dejar los siguientes paquetes: </h4>
                                <input type="checkbox" /> id: 1 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 2 Tamaño: Pequeño <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 3 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 4 Tamaño: Grande <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                </>
                            )
                        }

                        {
                            // <ImageComponent image={packages[0].qrOrigen}/>
                            // console.log(packages)

                            // packages.map(paquete => (
                            <>

                                {/* <ImageComponent image={paquete.qrOrigen} /> */}
                                {/* <h2>Recoger los siguientes paquetes: </h2> */}
                                {/* {
                                        step===2 && paquete.casilleroOrigen.ubicacion === 'satélite' && <ImageComponent image={paquete.qrOrigen} />
                                    } */}
                                {/* {step>=3 && <h3>Dejar los siguientes paquetes: </h3>} */}
                            </>
                            // ))

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
