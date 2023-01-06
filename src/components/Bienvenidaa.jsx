
import { FooterLanding } from "./FooterLanding"
import { Link } from 'react-router-dom';
import '../css/bienvenido.css'
import { Navbar } from "./Navbar";
import { useAuthStore } from "../hooks";


export const Bienvenidaa = () => {
    const { user, startLogout } = useAuthStore();

    return (

        <div className='container-fluid'>
            <div className='row'>
                <Navbar/>
            </div>

            <div className='row mt-5 mb-5'>
                <div className="col text-center">
                    <h1>¡Hola {user.name}!</h1>
                    <img src="../public/img/delivery.jfif" alt="bienvenido" className="ms-3 m-auto w-50" />
                </div>
                <div className="col">
                    <div className="container-fluid">
                        <div className="row altura1"></div>
                        <div className="row">
                            <p>De click en la operación que desee realizar</p>
                        </div>
                        <div className="row">
                            <Link to="/enviar-paquete" className='btn w-75 btn-primary-c m-auto mb-4 mt-3'>Enviar paquete</Link>
                            <Link to="/mis-paquetes" className='btn w-75 btn-primary-c m-auto mb-4'>Ver mis paquetes</Link>
                            <Link to="/editar" className='btn w-75 btn-primary-c m-auto mb-4'>Ver mi cuenta</Link>
                            <Link to="/pago" className='btn w-75 btn-primary-c m-auto mb-4'>Administrar métodos de pago</Link>
                            <Link 
                                to="/auth/register" 
                                className='btn w-75 btn-primary-c m-auto mb-4'
                                onClick={startLogout}
                            >Salir</Link>
                        </div>
                        <div className="altura2"></div>
                    </div>
                </div>
            </div>

            <div className='row mt-5'>
                <FooterLanding />
            </div>

        </div>


    )
}