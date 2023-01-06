
import '../../css/FirstStepPage.css'
import '../../css/colores.css'
import { NextButton } from './NextButton'
import { usePackageDeliveryStore } from '../../hooks'
import { PreviousButton } from './PreviousButton'
import { Link } from 'react-router-dom'

export const FourthStep = () => {

    const { origen, destino, destinatario, setIncrementStep, kms } = usePackageDeliveryStore();
    // {console.log({origen, destino, destinatario})};

    const increment = () => {
        setIncrementStep();
    }
    console.log(kms);
    const subtotal = Math.round(kms/3 *24.20+30);
    const iva = Math.round(0.16*subtotal);
    return (
        <div className='container-fluid'>
            <div className='formulario row m-auto mb-5 anchox mt-4'>
            	<p className='center fw-bold fs-5 text-center borde pb-4'>Resumen de envío</p>
							{/* <hr/> */}

                <p>Locker de origen:<span className='fW-700'>{origen.locker_name}</span></p>
                <p>Locker de destino:<span className='fW-700'> {destino.locker_name}</span></p>
                <p>Dimensiones de locker:<span className='fW-700'>{destinatario.dimensiones}</span></p>
                <p>Correo electrónico del destinatario: <span className='fW-700'>{destinatario.email}</span></p>

                <div className='row'>
                    <div className='col-lg-3'>
                        <p className='fW-700'>Costo de envío:</p>
                    </div>
                    <div className='col-lg-3'>
                        <p>Subtotal: <span>${subtotal}</span></p>
                        <p id="iva">IVA: <span>${iva}</span></p>
                        <hr id="cuenta" />
                        <p id='total' className='fW-700'>Total: <span>${subtotal+iva}</span></p>
                    </div>
                </div>
							<div className='d-flex m-auto mt-5 mb-5 p-3 justify-content-between'>
                <div className=''>
                <PreviousButton/>
                </div>
                <div className=''>
                    <Link to="/" className='btn btn-sig2'>Cancelar</Link>
                </div>
                <div className=''>
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

            
        </div>
    )
}