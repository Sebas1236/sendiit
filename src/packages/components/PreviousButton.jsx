import { usePackageDeliveryStore } from "../../hooks"

export const PreviousButton = ({ text = 'Regresar'}) => {
    const { setDecrementStep } = usePackageDeliveryStore();
    const decrement = () => {
        setDecrementStep();
    }
    return (

        // <div className='col'>
            <input
                className="w-20 btn btn-lg btn-prev"
                onClick={decrement}
                type="button"
                value={text} />
        // </div>
    )
}
