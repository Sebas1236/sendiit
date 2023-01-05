import { FooterLanding } from '../FooterLanding';
import { Link } from 'react-router-dom';
import '../../css/bienvenido.css'
import '../../css/admin.css'
import { Navbar } from '../Navbar';
import { useAuthStore } from "../../hooks";
import { NavbarAdmin } from './NavbarAdmin';

export const MenuAdmin = () => {
    const { user, startLogout } = useAuthStore();
    
    return (

        <div className='container-fluid'>
            <div className='row'>
                <NavbarAdmin/>
            </div>
                <div className='row mt-5 text-center '>
                <h2 className='fw-bold' >Menú del Administrador</h2>
            </div>
            
            <div className='row mt-5'>
                
                
                <div className='col ms-5 me-5 '>
                <div className="card bordeCard " >
                    <img src='/img/Estadisticas.png' className="card-img-top imagen m-auto mt-3 mb-3"/>
                    <div className="card-body azul bordeBo  text-center ">
                       <Link to="/" className="card-title fw-bold titulo h5">Estadísticas</Link>
                    </div>
                </div>
                </div>
                
                <div className='col ms-5 me-5 '>
                <div className="card bordeCard blanc" >
                    <img src='/img/usuarios.png' className="card-img-top imagen m-auto mt-3 mb-3"/>
                    <div className="card-body azul bordeBo text-center">
                      <Link to="/gestionUsuarios" className="card-title fw-bold titulo h5">Gestionar usuarios</Link>
                    </div>
                </div>
                </div>

                <div className='col ms-5 me-5 ancho '>
                <div className="card bordeCard blanc" >
                    <img src='/img/lockers.png' className="card-img-top imagen m-auto mt-3 mb-3"/>
                    <div className="card-body azul bordeBo text-center">
                      <Link to="/" className="card-title fw-bold titulo h5">Gestionar Lockers</Link>
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