import { usePackageDeliveryStore } from "../../hooks"

export const NextButton = ({ text = 'Siguiente'}) => {
    const { setIncrementStep } = usePackageDeliveryStore();
    const increment = () => {
        setIncrementStep();
    }
    return (

        <div className='col'>
            <input
                className="w-20 btn btn-lg btn-sig"
                // onClick={increment}
                type="submit"
                value={text} />
        </div>
    )
}
