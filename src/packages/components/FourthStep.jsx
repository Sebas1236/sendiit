
import '../../css/FirstStepPage.css'
import '../../css/colores.css'
import { NextButton } from './NextButton'
import { usePackageDeliveryStore } from '../../hooks'
import { PreviousButton } from './PreviousButton'


export const FourthStep = () => {

    const { origen, destino, destinatario, setIncrementStep } = usePackageDeliveryStore();
    // {console.log({origen, destino, destinatario})};

    const increment = () => {
        setIncrementStep();
    }

    return (
        <div className='container-fluid'>

            <p className='center fW-700 borde'>Resumen de envío</p>

            <div className='formulario row m-auto anchox'>

                <p>Locker de origen:<span className='fW-700'>{origen.locker_name}</span></p>
                <p>Locker de destino:<span className='fW-700'> {destino.locker_name}</span></p>
                <p>Dimensiones de locker:<span className='fW-700'>{destinatario.dimensiones}</span></p>
                <p>Correo electrónico del destinatario: <span className='fW-700'>{destinatario.email}</span></p>

                <div className='row'>
                    <div className='col-lg-3'>
                        <p className='fW-700'>Costo de envío:</p>
                    </div>
                    <div className='col-lg-3'>
                        <p>Subtotal: <span>$93.45</span></p>
                        <p id="iva">IVA: <span>$15.04</span></p>
                        <hr id="cuenta" />
                        <p id='total' className='fW-700'>Total: <span>$109.00</span></p>
                    </div>
                </div>

            </div>

            <div className='row m-auto mt-3 mb-5 p-3 anchox justify-content-between'>
                <div className='col-5 text-start'>
                    {/* <button type="button" className="btn btn-cancelar ">Cancelar</button> */}
                    <PreviousButton/>
                </div>
                <div className='col-5 text-end'>
                    <button 
                        type="button" 
                        className="w-20 btn btn-lg btn-sig" 
                        onClick={increment}
                    >
                        Siguiente
                    </button>

                </div>
                {/* <NextButton/> */}
            </div>
        </div>
    )
}