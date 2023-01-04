import { FooterLanding, Navbar } from "../../components"
import { usePackageDeliveryStore } from "../../hooks";
import { MapsApp } from "../../maps/MapsApp";
import { FifthStep, FirstStep, FourthStep, NextButton, SecondStep, SendInformation, ThirdStep, TrackPoints, TrackStepsPoints } from "./";

export const TrackSteps = () => {
    const { setDecrementStep, setIncrementStep, step } = usePackageDeliveryStore();
    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            {step === 0 && <SendInformation />}
            {/* {step >= 1 && <TrackPoints />} */}
						{step >= 1 && <TrackStepsPoints step={step}/> }
            {step === 1 && <FirstStep />}
            {step === 2 && <SecondStep />}
            {step === 3 && <SecondStep />}
            {/* {step === 2 && <MapsApp />} */}
            {/* {step === 3 && <ThirdStep />} */}
            {step === 4 && <FourthStep />}
            {step === 5 && <FifthStep />}
            {/* <NextButton/> */}
            <div className='row'>
                <FooterLanding />
            </div>
        </div>
    )
}
