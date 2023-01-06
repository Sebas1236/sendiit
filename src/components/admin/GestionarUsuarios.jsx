import { FooterLanding } from '../FooterLanding';
import { Link } from 'react-router-dom';
import '../../css/bienvenido.css'
import '../../css/admin.css'
import { Navbar } from '../Navbar';
import { useAuthStore } from "../../hooks";
import { NavbarAdmin } from './NavbarAdmin';

export const GestionarUsuarios= () => {
    const { user, startLogout } = useAuthStore();
    
    return (

        <div className='container-fluid'>
            <div className='row'>
                <NavbarAdmin/>
            </div>
                <div className='row mt-5 text-center '>
                <h2 className='fw-bold' >Gestionar usuarios</h2>
            </div>
            
            <div className='row mt-5'>
                
                
                <div className='col '>
                <div className="card bordeCard blanc ancho m-auto" >
                    <img src='/img/cliente.png' className="card-img-top imagen m-auto mt-3 mb-3"/>
                    <div className="card-body azul bordeBo text-center">
                      <Link to="/" className="card-title fw-bold titulo h5">Administrar Clientes</Link>
                    </div>
                </div>
                </div>

                <div className='col '>
                <div className="card bordeCard blanc ancho  m-auto" >
                    <img src='/img/repartidores.png' className="card-img-top imagen m-auto mt-3 mb-3"/>
                    <div className="card-body azul bordeBo text-center">
                      <Link to="/" className="card-title fw-bold titulo h5">Administrar Repartidores</Link>
                    </div>
                </div>
                </div>
            </div>

            <div className='row altura2'></div>
            <div className='row mt-5'>
                <FooterLanding />
            </div>

        </div>


    )
}