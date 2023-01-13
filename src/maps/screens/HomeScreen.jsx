import { useState } from "react";
import { FooterLanding, Navbar } from "../../components";
import { RouteMap, StartMap, TrackRoute } from "../../components/repartidor";
import { useAuthStore, useMapStore, usePackageDeliveryStore, useRouteMapStore } from "../../hooks";
import { usePlacesStore } from "../../hooks/usePlacesStore";
import { MapView } from "../components";


export const HomeScreen = (props) => {
    const { userLocation } = usePlacesStore();
    const { step, setIncrementStep } = usePackageDeliveryStore();
    const { map } = useMapStore();
    const { prepareRouteGeneration, startTrip } = useRouteMapStore();
    const { status } = useAuthStore();

    const [btnText, setBtnText] = useState("Ver ruta");

    const startRoute = () => {
        // console.log(step);
        if (step === 0) {
            setBtnText("Empezar ruta");
        } else {
            setBtnText("Siguiente");
        }

        // if(step === 1){
        //     prepareRouteGeneration(map)
        // }
        setIncrementStep();
    };



    return (
        <>
            {
                status === 'Cliente'
                    ?
                    (

                        <MapView />

                    )
                    :
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="container-fluid">
                            <div className='row'>
                                <Navbar />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    {/* <TrackRoute /> */}
                                    {
                                        step <= 1 ? <StartMap /> : <TrackRoute />
                                    }

                                </div>
                                {/* <div className="col-lg-6 center">

                                    <button
                                        className="w-20 btn btn-lg btn-sig"
                                        onClick={startRoute}
                                        style={{
                                            // position: 'absolute',
                                            // right: 20,
                                            marginBottom: '5%'
                                        }}
                                    >{btnText}</button>

                                </div> */}
                                <div className='d-flex m-auto mt-5 mb-5 p-3 justify-content-between'>
                                    <div className=''></div>
                                    <div className=''></div>
                                    <div className=''>
                                        <button
                                            className="w-20 btn btn-lg btn-sig"
                                            onClick={startRoute}
                                            style={{
                                                // position: 'absolute',
                                                // right: 20,
                                                marginBottom: '20%'
                                            }}
                                        >{btnText}</button>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <FooterLanding />
                            </div>
                        </div>
                    </div>
                // <RouteMap />
                // <StartMap />
            }
        </>

    )
}
