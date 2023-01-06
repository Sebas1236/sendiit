//MyPackagesDeliveryMan
import { FooterLanding } from '../../components';
import { NavbarRepartidor } from './NavbarRepartidor';
import './MyPackagesDeliveryMan.css';

export const MyPackagesDeliveryMan = () => {

    return (
        <div className='container-fluid'>
            <div className='row'>
                <NavbarRepartidor />
            </div>
            <br /><br />
            <p className="text-center fw-bold fs-2">Mis paquetes</p>
            <br /><br />
            <div className="d-flex justify-content-center align-items-center">
                <div className="col-md-10">
                    <table className="table" id="tabla-paquetes">
                        <thead>
                            <tr>
                                <th scope="col" class="spacing">ID</th>
                                <th scope="col">Tamaño &nbsp;&nbsp;
                                    <select class="form-select selectAltura" aria-label="Default select example">
                                        <option selected>Todos</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </select></th>
                                <th scope="col">Origen &nbsp;&nbsp;
                                    <select class="form-select selectAltura" aria-label="Default select example">
                                        <option selected>Todos</option>
                                        <option value="CoyoacAn_O">Coyoacán</option>
                                        <option value="SantaFe_O">Santa Fe</option>
                                        <option value="Satelite_O">Satélite</option>
                                        <option value="DelValle_O">Del Valle</option>
                                    </select></th>
                                <th scope="col">Destino &nbsp;&nbsp;
                                    <select class="form-select selectAltura" aria-label="Default select example">
                                        <option selected>Todos</option>
                                        <option value="CoyoacAn_D">Coyoacán</option>
                                        <option value="SantaFe_D">Santa Fe</option>
                                        <option value="Satelite_D">Satélite</option>
                                        <option value="DelValle_D">Del Valle</option>
                                    </select></th>
                                <th scope="col" class="spacing-2 text-center">Estado actual</th>
                                <th scope="col"></th>
                            </tr>

                            {/* Pruebas */}
                            <tr>
                                <td>302122</td>
                                <td><br /> <b>Recibido el 9 de oct. 2022</b>  <br />  M, 16’’ x 9.5’</td>
                                <td>Coyoacán</td>
                                <td>Santa fe</td>
                                <td class="text-center">En espera de recolección</td>
                                <td class="spacing-3 text-right"><div><input
											className="w-70 btn btn-lg btn-primary-c" 
											type="submit"
											value="Ver más" /></div></td>
                            </tr>
                            <tr>
                                <td>302567</td>
                                <td><br /> <b>Recibido el 10 de dic. 2022</b>  <br />  M, 16’’ x 9.5’</td>
                                <td>Santa fe</td>
                                <td>Satélite</td>
                                <td class="text-center">En camino</td>
                                <td class="spacing-3 text-right"><div><input
											className="w-70 btn btn-lg btn-primary-c" 
											type="submit"
											value="Ver más" /></div></td>
                            </tr>
                        </thead>

                    </table>
                </div>
            </div>
            
            <br />

            <div className='row mt-5'>
                <FooterLanding />
            </div>
        </div>

        
    )
}