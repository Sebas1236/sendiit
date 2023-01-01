import { RouteMap } from "../../components/repartidor";
import { useAuthStore } from "../../hooks";
import { usePlacesStore } from "../../hooks/usePlacesStore";
import { MapView } from "../components";


export const HomeScreen = (props) => {
    const { userLocation } = usePlacesStore();
    const { status } = useAuthStore();
    return (
        <div className="d-flex justify-content-center align-items-center">
            {
                status === 'Cliente'
                    ?
                    <MapView /> :
                    <RouteMap />
            }

        </div>
    )
}
