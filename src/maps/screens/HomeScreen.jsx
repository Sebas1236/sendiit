import { RouteMap, StartMap } from "../../components/repartidor";
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
                    (<>
                        <div className='container-fluid'>
                            <div className='row'>
                                <Navbar />
                            </div>
                            <MapView />
                            <div className='row'>
                                <FooterLanding />
                            </div>

                        </div>
                    </>)
                    :
                    // <RouteMap />
                    <StartMap />
            }

        </div>
    )
}
