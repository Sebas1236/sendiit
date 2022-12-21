import { useEffect } from "react";
import { usePlacesStore } from "../hooks/usePlacesStore";
import { HomeScreen } from './screens/HomeScreen';

import '../styles.css';

export const MapsApp = () => {
    const { startUserLocation } = usePlacesStore();

    useEffect(() => {
        startUserLocation();
    }, []);
    
    return (
        <HomeScreen/>
    )
}
