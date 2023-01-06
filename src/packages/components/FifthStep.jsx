
import '../../css/FirstStepPage.css'
import '../../css/colores.css'
import { CreditCardModal, FabAddNew } from '../../CreditCard/components'
import { NextButton } from './NextButton'
import { useCardStore, usePackageDeliveryStore, usePackageStore } from '../../hooks'
import { useEffect } from 'react'
import { PreviousButton } from './PreviousButton'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

//TODO: REDIRECCIONAR UNA VEZ FINALIZADO EL ENVÍO
const Tarjeta = ({ tipo, terminacion, nombre, vencimiento, idR }) => {
    return (
        <tr >
            <th>
                <input className="form-check-input" type="radio" name="tarjetas" id="radio1" />
                <label className="form-check-label" htmlFor="radio1"></label>
            </th>
            <th scope="row"><img src="/img/icons/creditCard.png" alt="..." width="35px" height="" /></th>
            <td><span className='fw-bold'>{tipo}</span> que termina en {terminacion}</td>
            <td>{nombre}</td>
            <td>{vencimiento}</td>
        </tr>

    )
}

export const FifthStep = () => {

    const { startSavingPackage } = usePackageStore();
    const { cards, startLoadingCards } = useCardStore();
    const { origen: origenStore, destinatario, destino: destinoStore, clearPackageInfo } = usePackageDeliveryStore();

    useEffect(() => {
        startLoadingCards();
    }, []);

    const onSavePackage = () => {
        //TODO: AÑADIR COSTO
        // console.log(origenStore);
        const newPackage = {
            destinatario,
            origen: origenStore.locker_name.toLowerCase(),
            destino: destinoStore.locker_name.toLowerCase(),
            descripcion: destinatario.descripcionPaquete,
            tamano: destinatario.dimensiones.substr(0, destinatario.dimensiones.indexOf(' ')),
            dimensiones: destinatario.dimensiones.substr(destinatario.dimensiones.indexOf(' ') + 1),
        }
        // console.log(newPackage);
        startSavingPackage(newPackage);
        Swal.fire('Éxito', 'Su paquete ha sido enviado con éxito', 'success');
        clearPackageInfo();
    }

    return (
        <div className='container-fluid'>
            <p className='center fW-700 borde fw-bold'>Información de pago</p>

            <div className='formulario2 row anchox m-auto'>

                <p className='fw-bold '>Mis tarjetas de crédito y débito</p>

                <div className="d-flex justify-content-center align-items-center">
                    <div className="col-md-7">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th></th>
                                    <th scope="col">Nombre en la tarjeta</th>
                                    <th scope="col">Vencimiento</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <Tarjeta tipo="Visa" terminacion="*1221" nombre="Miguel Angel" vencimiento="08/23" idR="radio1" />
                                <Tarjeta tipo="MasterCard" terminacion="*2222" nombre="Sofia" vencimiento="01/24" idR="radio2" />
                                <Tarjeta tipo="Visa" terminacion="*9988" nombre="Miranda" vencimiento="12/22" idR="radio3" /> */}
                                {
                                    cards.map(card => (
                                        <Tarjeta key={card._id}
                                            tipo="Visa"
                                            terminacion={card.cardNumber.slice(-3)}
                                            nombre={card.cardName}
                                            vencimiento={`${card.month} / ${card.year}`}
                                            idR="radio1"
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <CreditCardModal />
                <div className='text-center fw-bold fs-4'>
                    <FabAddNew />
                </div>

            </div>

            <div className='row m-auto mt-3 mb-5 p-3 anchox justify-content-between'>
                <div className='col-4 text-start'>
                <PreviousButton/>
                </div>
                <div className='col-4 text-center'>
                    <Link to="/" className='btn btn-sig2'>Cancelar</Link>
                </div>
                <div className='col-4 text-end'>
                    <button 
                        type="button" 
                        className="w-20 btn btn-lg btn-sig" 
                        onClick={onSavePackage}
                    >
                        Finalizar
                    </button>
                </div>
                {/* <NextButton /> */}
            </div>

            <div className='alturax'>

            </div>
        </div>
    )
}