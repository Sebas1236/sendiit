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
            <CreditCardBox
                // cards={cards}
            // style={{height:'calc(100vh-80p)'}}
            />
            <CreditCardModal />
            <FabAddNew/>
            {/* <FabDelete/> */}

            <div className='row'>
                <FooterLanding />
            </div>
        </div>
    )
}
