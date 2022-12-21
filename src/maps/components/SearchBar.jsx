import { useRef } from "react"
import { usePlacesStore } from "../../hooks/usePlacesStore";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {

    const { searchPlacesByTerm } = usePlacesStore();
    const debounceRef = useRef();

    const onQueryChanged = ( event ) => {
        //Borrar el valor del timeout
        if( debounceRef.current )
            clearTimeout( debounceRef.current );
        
        debounceRef.current = setTimeout(() => {
            // 1 seg después de que dejamos de escribir
            searchPlacesByTerm( event.target.value );
            console.log('debounce value:', event.target.value);
        }, 1000);
    };

    return (
        <div 
            // className="search-container"
        >
            <input type="text"
                className="form-control"
                placeholder="Buscar lugar..."
                onChange={ onQueryChanged }
            />
            <SearchResults/>
        </div>
    )
}
