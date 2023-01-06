import { NavbarInicio, Footer, FooterLanding, NavbarLanding, Navbar, } from '../../components';
import { Link } from 'react-router-dom';
import { NavbarRepartidor } from './NavbarRepartidor';
import './EditStatusRep.css'



export const EditStatusRep = ()=>{
    return (
    <div className='container-fluid'>
    <div className='row'>
     <NavbarRepartidor/>
    </div>
        <h1 className="h3 mt-5 mb-4 fw-bold text-center">Editar estado del paquete</h1> 
        <div className='d-flex justify-content-evenly'>
                <div>
                <h4 className='mb-2 fw-bold mb-4'>Estado: En espera de recolección</h4> 
                <p className='mb-2 fw-bold mb-4 '>ID: 1</p> 
                <p className='mb-2 fw-bold mb-4'>Origen: Santa fe</p> 
                <p className='mb-2 fw-bold mb-4'>Destino: Destino</p> 
                <p className='mb-2 fw-bold mb-4'>Tamaño: Pequeño</p> 
                <p className='mb-2 fw-bold mb-4'>Descripción: Guirnalda navidad</p>
                <p className='mb-2 fw-bold mb-4'>Cliente remitente: Angel</p>
                <p className='mb-2 fw-bold mb-4'>Cliente destinatario: Daniel</p>
                </div>
                <figure className='text-center'>
               
                <img className="mb-2 m-auto" src='/img/qr.jpg' alt="QR" width="180" height="180"/> 
                
                <figcaption>QR para abrir locker en espera de recolección</figcaption>
                </figure>
        </div>
       
        <div className='d-flex justify-content-center'>
        <button type="submit" className="btn btn-rojo">Cambiar estado</button>
        </div>
        <div className='row alturax'></div>
        <div className='row'>
            <FooterLanding/>
        </div>
    </div>           
    )              
}