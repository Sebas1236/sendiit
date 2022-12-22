import { Navbar, FooterLanding } from '../../components';
import '../../css/Stepper.css';
import '../../auth/pages/css/LoginPage.css'
import { usePackageStore } from '../../hooks';
import { Link } from 'react-router-dom';

export const TrackPackage = () => {

    const { activePackage } = usePackageStore();

    const allItems = document.querySelectorAll(".navmenu ul li p.title");

    allItems.forEach(item => {
        item.addEventListener("click", function (e) {
            for (var i = 0; i < allItems.length; i++) {
                allItems[i].classList.remove("active");
            }
            this.classList.add("active");
        });
    });


    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>

            <div className='row text-center'>

                <div className="form-signin w-100 m-auto">

                    <img className="mb-4" src='/img/brand/logo.png' alt="sendiit" width="250" />
                    <div className='row'>
                        <Link to="/mis-paquetes" className='btn w-75 btn-primary-c m-auto mb-4'>Regresar</Link>
                        <h1 className="h3 mb-5 fw-bold">Estado del paquete</h1>
                    </div>


                    <div className='text-start'>
                        {/* <p><b>ID:</b> 310340</p> */}
                        <p><b>Descripción:</b> {activePackage.descripcion}</p>
                        <p><b>Ruta: </b>Origen: {activePackage.casilleroOrigen.ubicacion.charAt(0).toUpperCase() + activePackage.casilleroOrigen.ubicacion.slice(1)} Destino: {activePackage.casilleroDestino.ubicacion.charAt(0).toUpperCase() + activePackage.casilleroDestino.ubicacion.slice(1)}</p>
                        <p><b>Tamaño: </b>{activePackage.tamano}</p>
                    </div>

                    <br /><br /><br />

                    <div className='d-flex justify-content-center'>
                        <div className='col boximg'>
                            <img src="../../public/img/boxes.png" alt="paquetes" width="250" />
                        </div>


                        <div className='col'>
                            <nav className='navmenu'>
                                <ul>
                                    <li>
                                        <p className='title active'>Por recibir</p>
                                        <p>{activePackage.estadosFechas.porRecibir.slice(0,10)}</p>
                                        {/* <p>3 de nov. 2022 a las 16:00hrs </p> */}
                                    </li>
                                    <li>
                                        <p className=' title'> En espera</p>
                                        {/* <p>3 de nov. 2022 a las 20:00hrs </p> */}
                                    </li>
                                    <li>
                                        <p className=' title'>En camino</p>
                                        {/* <p>4 de nov. 2022 a las 10:00hrs </p> */}
                                    </li>
                                    <li>
                                        <p className=' title'>En locker</p>
                                    </li>
                                    <li>
                                        <p className=' title'>Recogido</p>
                                    </li>
                                    <li>
                                        <p className=' title'>En almacén</p>
                                    </li>
                                    <li>
                                        <p className=' title'>Desechado</p>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>





            <div className='row'>
                <FooterLanding />
            </div>

        </div>

    )
}