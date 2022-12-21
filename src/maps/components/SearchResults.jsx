import { useState } from "react";
import { usePlacesStore, useMapStore } from "../../hooks";
import { LoadingPlaces } from "./";


export const SearchResults = () => {

    const { places, isLoadingPlaces, userLocation } = usePlacesStore();
    const { map, getRouteBetweenPoints } = useMapStore();
    const [activeId, setActiveId] = useState('');

    const onPlaceClicked = ( place ) => {
        const [ lng, lat ] = place.center;
        setActiveId( place.id );
        map?.flyTo({
            zoom: 14,
            center: [ lng, lat ],
        });
    }

    const getRoute = ( place ) => {
        if( !userLocation ) return;
        const [lng, lat] = place.center;
        getRouteBetweenPoints(userLocation, [lng, lat]);
    }

// TODO: CARGANDO
    if( isLoadingPlaces ) {
        return (
            <LoadingPlaces/>
        );
    }

    if( places.length === 0 ){
        return <></>;
    }

    return (
        <ul className="list-group mt-3">

            {
                places.map(place => (
                    <li
                        key = {place.id}
                        className={`list-group-item list-group-item-action pointer ${ activeId === place.id ? 'active':'' }`}
                        onClick={ () => onPlaceClicked( place )}
                    >
                        <h6>{ place.text_es }</h6>
                        <p
                            // className="text-muted"
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            { place.place_name }
                        </p>
                        <div>
                            <button 
                                onClick={()=> getRoute( place )}
                                className={`btn btn-sm ${activeId===place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
                            >
                                Direcciones
                            </button>
                        </div>

                    </li>
                ))
            }
        </ul>
    )
}
