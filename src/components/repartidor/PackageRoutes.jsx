import { FooterLanding, Navbar } from "../"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useMapStore, usePlacesStore } from "../../hooks";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Loading } from "../../maps/components";
import { RouteMap } from "./";
import { MapsApp } from "../../maps/MapsApp";

export const PackageRoutes = () => {
    // const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2ViYXMxMjM2IiwiYSI6ImNsYmlyeWVpNTBhYTQzcG54cTRoenhpZ3QifQ.BFA6ei27WaRWEQRBknO62QR_ACCESS_TOKEN"
    // mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            <MapsApp/>
            <div className='row'>
                <FooterLanding />
            </div>

        </div>
    )
}
