import { useDispatch, useSelector } from "react-redux"
import searchApi from "../api/searchApi";
import { getUserLocation } from "../maps/helpers/getUserLocation";
import { placesReducer, setLoadingPlaces, setPlaces } from "../store/places/placesSlice";

export const usePlacesStore = () => {
    const { isLoading, userLocation, isLoadingPlaces, places } = useSelector(state => state.places);
    const dispatch = useDispatch();

    const startUserLocation = async() => {
        //OBTENEMOS GEOLOCALIZACIÓN DE LA PERSONA
        await getUserLocation()
            .then((lngLat) => dispatch(placesReducer({ lngLat })))   
    }

    const searchPlacesByTerm = async( query ) => {
        if( query.length === 0 ){
            dispatch( setPlaces( [] ) );
            return [];
        }
        if( !userLocation ) throw new Error('No hay ubicación del usuario');
        
        dispatch( setLoadingPlaces() );

        const resp = await searchApi.get(`/${ query }.json`, {
            params: {
                // LONGITUD LATITUD
                proximity: userLocation.join(','),
            }
        });
        dispatch( setPlaces( resp.data.features  ) );

        return resp.data.features;
    }

    return {
        //* Propiedades
        isLoading,
        userLocation,
        isLoadingPlaces,
        places,

        //* Métodos
        startUserLocation,
        searchPlacesByTerm,
    }
}