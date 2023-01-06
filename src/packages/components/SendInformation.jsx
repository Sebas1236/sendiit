import '../../auth/pages/css/LoginPage.css';
import { usePackageDeliveryStore } from '../../hooks';

export const SendInformation = () => {
    const { setIncrementStep } = usePackageDeliveryStore();
    const increment = () => {
        setIncrementStep();
    }
    return (
        <div className='container-fluid'>
            <div className='step-background m-5 pb-5'>
							<br /><br />
							<p className="fw-bold text-center fs-5 pb-4">Información antes de enviar el paquete</p>
							{/* <hr className="anchox m-auto pb-3" /> */}
							<div className="d-flex justify-content-center align-items-center">
									<div className="col-md-7">
											<ul>
													<li type="disc">Los envíos se realizan en un máximo de 24 horas.</li>
													<li type="disc">El usuario remitente debe realizar la entrega del paquete en el locker en un máximo de 24 horas</li>
													<li type="disc">El usuario destinatario cuenta con 24 horas para recoger el paquete, de lo contrario pasará al almacén en donde podrá recuperarlo con un costo adicional. Asimismo, cuenta con 48 horas para recogerlo en el almacén, de no hacerlo será desechado.</li>
													<li type="disc">No se permite el envío de paquetes perecederos.</li>
													<li type="disc">La única forma de pago es por medio de trajeta de crédito y/o débito.</li>
											</ul>
											<div className="form-signin w-100 m-auto d-flex justify-content-center">
													<img className="mb-5" src="/img/icons/deliveryBoy.png" alt="sendiit" width="200" />
											</div>
									</div>
							</div>
							<div className='d-flex anchox justify-content-end justify-self-center'>
						
									
											<input
													className="w-20 btn btn-lg btn-sig btn-primary-c"
													onClick={increment}
													type="submit"
													value="Siguiente" />
									
							</div>
							<br />
						</div>
        </div>
    )
}