import '../../auth/pages/css/LoginPage.css';
import { CreditCardModal } from './CreditCardModal';
import { CreditCardBox } from './CreditCardBox';

import { FooterLanding, Navbar } from '../../components';
import { FabAddNew } from './FabAddNew';
import { FabDelete } from './FabDelete';

export const CreditCardPage = () => {

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>
            <br /><br />
            <p className="text-center fw-bold fs-4">Administrar métodos de pago</p>
            <div className="d-flex justify-content-center align-items-center">
                <div className="col-md-7">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Nombre en la tarjeta</th>
                                <th scope="col">Vencimiento</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <CreditCardBox />
                        </tbody>
                    </table>
                </div>
            </div>
            <CreditCardModal />
            <div className='text-center fw-bold fs-4'>
                <FabAddNew />
            </div>
            <br />
            {/* <FabDelete/> */}
            <div className='row altura'></div>
            <div className='row'>
                <FooterLanding />
            </div>
        </div>
    )
}
