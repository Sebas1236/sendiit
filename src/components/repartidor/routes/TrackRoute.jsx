// import '../css/trackRoute.css'
import '../css/routestyles.css'
import mapboxgl, { Map } from 'mapbox-gl';
import { usePlacesStore, useRouteMapStore, usePackageDeliveryStore, usePackageStore } from '../../../hooks';
import { useEffect, useLayoutEffect, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Loading } from '../../../maps/components';
import Swal from 'sweetalert2';

export const TrackRoute = () => {
    const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2ViYXMxMjM2IiwiYSI6ImNsYmlyeWVpNTBhYTQzcG54cTRoenhpZ3QifQ.BFA6ei27WaRWEQRBknO62Q"
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const { isLoading, userLocation, } = usePlacesStore();
    const { step } = usePackageDeliveryStore();
    const { prepareRouteGeneration, startTrip, waypoints } = useRouteMapStore();

    const mapDiv = useRef(null);
    const { startLoadingAllPackages, isLoadingPackages, packages, startHandlePackageStatus } = usePackageStore();

		// maneja clic sobre qr
		const handleQrClick = (paquete) => {
			console.log("qr clic");

			//Descomentar para probar Zoom en qr
			/*
			Swal.fire({
				title: 'Código QR',
				html: `<img src="${paquete.qrOrigen}" alt="qr code" width="300px"/>`,
				showCloseButton: true,
				showCancelButton: false,
				showConfirmButton: false,
				focusConfirm: false,
				focusCancel: false,
			});
			*/
		};

    useEffect(() => {
        startLoadingAllPackages();
    }, [packages]);
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

    const handleStatusChange = (paquete) => {
        let changeStatus = '';
        switch (paquete.estadoActual) {
            case 'Por recibir':
                changeStatus = 'En espera';
                break;
            case 'En espera':
                changeStatus = 'En camino';
                break;
            case 'En camino':
                changeStatus = 'En locker de destino';
                break;
            case 'En locker de destino':
                changeStatus = 'Recogido';
                break;
            case 'Recogido':
                changeStatus = 'En almacén';
                break;
            case 'En almacén':
                changeStatus = 'Desechado';
                break;

            default:
                break;
        };
        console.log(paquete.estadoActual);
        if (paquete.estadoActual !== 'Desechado' && paquete.estadoActual !== 'Recogido') {
            Swal.fire({
                title: `¿Confirmar cambio de estado a <strong style="color: #e41f1a">${changeStatus}</strong>?`,
                text: "Esta acción es irreversible!",
                imageUrl: '/img/icons/deliveryBoy.png',
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'repartidor',
                // icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cambiar estado',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    paquete = startHandlePackageStatus(paquete._id);
                    console.log(paquete);
                    Swal.fire(
                        'Status cambiado!',
                        `El status del paquete ha cambiado a ${changeStatus}`,
                        'success'
                    )
                }
            });
        } else {
            Swal.fire({
                title: 'No es posible cambiar el status',
                text: 'El paquete ya ha sido desechado',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            })
        }

    }

    return (
        <>

            <div className="row">
                <div className="col-lg-6">
                    <div className="heading">
                        <h1>Instrucciones</h1>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div id="reports" className="reports">

                        {/* {packages.map(paquete=>(
                            <h1>hola</h1>
                        ))} */}
                    </div>
                    <div>
                        {
                            step === 2 && (<>
                                <h4>Recoger los siguientes paquetes: </h4>
                                {
                                    packages.filter(paquete => paquete.casilleroOrigen.ubicacion
                                        === 'satélite' && paquete.estadoActual === 'En espera').map(
                                            paquete => ((
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        key={paquete._id}
                                                        onClick={() => handleStatusChange(paquete)}
                                                    /> Tamaño: {paquete.tamano}. Destino: {paquete.casilleroDestino.ubicacion.charAt(0).toUpperCase() + paquete.casilleroDestino.ubicacion.slice(1)}<img height={30} width={30} onClick={()=>handleQrClick(paquete)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                                    <br />
                                                    <br />
                                                </>
                                            ))
                                        )
                                }
                                {/* <input type="checkbox" /> id: 1 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 2 Tamaño: Pequeño <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 3 Tamaño: Mediano <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                <br />
                                <input type="checkbox" /> id: 4 Tamaño: Grande <img height={30} width={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" /> */}

                            </>)

                        }
                        {
                            // step >= 3 && step < 5 && (<>
                            step === 3 && (<>
                                <h4>Recoger los siguientes paquetes: </h4>
                                {
                                    packages.filter(paquete => paquete.casilleroOrigen.ubicacion
                                        === 'del valle' && paquete.estadoActual === 'En espera').map(
                                            paquete => ((

                                                <>
                                                    <input
                                                        type="checkbox"
                                                        key={paquete._id}
                                                        onClick={() => handleStatusChange(paquete)}
                                                    /> Tamaño: {paquete.tamano}. Destino: {paquete.casilleroDestino.ubicacion.charAt(0).toUpperCase() + paquete.casilleroDestino.ubicacion.slice(1)}<img height={30} width={30} onClick={()=>handleQrClick(paquete)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                                    <br />
                                                </>
                                            ))
                                        )
                                }
                                <h4>Dejar los siguientes paquetes: </h4>
                                {
                                    packages.filter(paquete => paquete.casilleroDestino.ubicacion
                                        === 'del valle' && paquete.estadoActual === 'En camino').map(
                                            paquete => ((
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        key={paquete._id}
                                                        onClick={() => handleStatusChange(paquete)}
                                                    /> Tamaño: {paquete.tamano}. Origen: {paquete.casilleroOrigen.ubicacion.charAt(0).toUpperCase() + paquete.casilleroOrigen.ubicacion.slice(1)}<img height={30} width={30} onClick={()=>handleQrClick(paquete)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                                    <br />
                                                </>
                                            ))
                                        )
                                }
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />

                            </>)

                        }
                        {
                            step === 4 && (<>
                                <h4>Recoger los siguientes paquetes: </h4>
                                {
                                    packages.filter(paquete => paquete.casilleroOrigen.ubicacion
                                        === 'coyoacán' && paquete.estadoActual === 'En espera').map(
                                            paquete => ((
                                                <>
                                                    {/* {console.log(paquete)} */}
                                                    <input
                                                        type="checkbox"
                                                        key={paquete._id}
                                                        onClick={() => handleStatusChange(paquete)}
                                                    /> Tamaño: {paquete.tamano}. Destino: {paquete.casilleroDestino.ubicacion.charAt(0).toUpperCase() + paquete.casilleroDestino.ubicacion.slice(1)}<img height={30} width={30} onClick={()=>handleQrClick(paquete)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                                    <br />
                                                </>
                                            ))
                                        )
                                }
                                <h4>Dejar los siguientes paquetes: </h4>
                                {
                                    packages.filter(paquete => paquete.casilleroDestino.ubicacion
                                        === 'coyoacán' && paquete.estadoActual === 'En camino').map(
                                            paquete => ((
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        key={paquete._id}
                                                        onClick={() => handleStatusChange(paquete)}
                                                    /> Tamaño: {paquete.tamano}. Origen: {paquete.casilleroOrigen.ubicacion.charAt(0).toUpperCase() + paquete.casilleroOrigen.ubicacion.slice(1)}<img height={30} width={30} onClick={()=>handleQrClick(paquete)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                                    <br />
                                                </>
                                            ))
                                        )
                                }
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </>)
                        }
                        {
                            step === 5 &&
                            (
                                <>
                                    <h4>Dejar los siguientes paquetes: </h4>
                                    {
                                        packages.filter(paquete => paquete.casilleroDestino.ubicacion
                                            === 'santa fe' && paquete.estadoActual === 'En camino').map(
                                                paquete => ((
                                                    <>
                                                        <input
                                                            type="checkbox"
                                                            key={paquete._id}
                                                            onClick={() => handleStatusChange(paquete)}
                                                        /> Tamaño: {paquete.tamano}. Origen: {paquete.casilleroOrigen.ubicacion.charAt(0).toUpperCase() + paquete.casilleroOrigen.ubicacion.slice(1)}<img height={30} width={30} onClick={()=>handleQrClick(paquete)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC" alt="noqr" />
                                                        <br />
                                                    </>
                                                ))
                                            )
                                    }
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </>
                            )
                        }
                    </div>

                    {/* <div id='listings' className='listings'></div> */}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div ref={mapDiv} id="mapDiv" className="map" style={{
                        // backgroundColor: 'red',
                        // height: '100vh',
                        // left: '100%',
                        // position: 'relative',
                        // textAlign: 'center',
                        // top: -200,
                        // width: '120vh',
                        height: '80vh',
                        marginTop: '5%',
                        marginBottom: '5%',
                        marginLeft: '10%',
                        // left: '100%',
                        // position: 'relative',
                        // textAlign: 'center',
                        // top: -583,
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
