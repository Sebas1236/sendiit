import { useMapStore, usePlacesStore } from "../../hooks"


export const BtnMyLocation = () => {

    const { userLocation } = usePlacesStore();
    const { map, isMapReady } = useMapStore();

    const onClick = () => {

        //1. El mapa está listo
        if( !isMapReady ) throw new Error('Mapa no está listo');
        if( !userLocation ) throw new Error('No hay ubicación de usuario');
        //2. Saber la ubicación del usuario
        map?.flyTo({
            zoom: 14,
            center: userLocation,
        });


    }

    return (
        <button 
            className="btn btn-primary"
            onClick={ onClick }
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            Mi Ubicación
        </button>
    )
}
