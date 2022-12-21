import { usePackageDeliveryStore } from "../../hooks";

export const TrackPoints = () => {
    const { setDecrementStep, setIncrementStep, step } = usePackageDeliveryStore();
    return (
        <div className="row puntos ">
            <div className='col-lg-7 right'>
                {
                    step >= 1 &&

                    <span className="dot primer"></span>
                }
                <hr />
                {
                    step >= 2
                        ?
                        <span className="dot primer"></span>
                        :

                        <span className="dot"></span>
                }
                <hr />
                {
                    step >= 3
                        ?
                        <span className="dot primer"></span>
                        :

                        <span className="dot"></span>
                }
                <hr />
                {
                    step >= 4
                        ?
                        <span className="dot primer"></span>
                        :

                        <span className="dot"></span>
                }
                <hr />
                {
                    step === 5
                        ?
                        <span className="dot primer"></span>
                        :

                        <span className="dot"></span>
                }



            </div>
            <div className='col-lg-5'>
                <p className="step fW-700">Paso {step} de 5</p>
            </div>

        </div>
    )
}
