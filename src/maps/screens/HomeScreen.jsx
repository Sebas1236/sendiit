import { usePlacesStore } from "../../hooks/usePlacesStore";
import { NextButton } from "../../packages/components";
import { BtnLockerLocations, BtnMyLocation, DisplayLockers, MapView, SearchBar, Sendiitlogo } from "../components";


export const HomeScreen = (props) => {
    const { userLocation } = usePlacesStore();
    return (
        <div className="d-flex justify-content-center align-items-center">
            <MapView/>
            {/* <BtnMyLocation/> */}
            {/* <Sendiitlogo/> */}
            {/* <SearchBar/> */}
            {/* <BtnLockerLocations/> */}
            {/* <NextButton/> */}
            {/* <DisplayLockers/> */}
        </div>
    )
}
