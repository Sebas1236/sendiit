import { FooterLanding } from '../FooterLanding';
import { Link } from 'react-router-dom';
import '../../css/bienvenido.css'
import '../../css/admin.css'
import { Navbar } from '../Navbar';
import { useAuthStore } from "../../hooks";
import { NavbarRepartidor } from './NavbarRepartidor';


export const MenuRepartidor = () => {
    const { user, startLogout } = useAuthStore();
    
    return (

        <div className='container-fluid'>
            <div className='row'>
                <NavbarRepartidor />
            </div>
                <div className='row mt-5 text-center '>
                <h2 className='fw-bold' >Menú Repartidor</h2>
            </div>
            
            <div className='row mt-5'>
                
                
                <div className='col '>
                <div className="card bordeCard ancho m-auto" >
                    <img src='/img/rutas.png' className="card-img-top imagen m-auto mt-3 mb-3"/>
                    <div className="card-body azul bordeBo  text-center ">
                       <Link to="/" className="card-title fw-bold titulo h5">Ver rutas</Link>
                    </div>
                </div>
                </div>
                
                <div className='col'>
                <div className="card bordeCard blanc ancho m-auto" >
                    <img src='/img/paquetes.png' className="card-img-top imagen m-auto mt-3 mb-3"/>
                    <div className="card-body azul bordeBo text-center">
                      <Link to="/myPackages" className="card-title fw-bold titulo h5">Ver paquetes</Link>
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