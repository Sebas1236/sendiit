import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import {  NavbarLanding, FooterLanding } from '../../components';
import { useAuthStore, useForm } from '../../hooks'
import './css/LoginPage.css'
import './css/NavbarLanding.css'

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LandingPage = () => {
     
    return (
        <div className='container-fluid'>
            <div className='row'>
                <NavbarLanding/> 
            </div>
            <img className="mb-4 casillerosImagen col-12 img-fluid" src='/img/brand/locker.jpg' alt="casilleros"  ></img>
            <div className='row text-center '>
                <div className="form-signin w-100 m-auto ">
                    
                    <img className="mb-4 imagenCentro" src='/img/brand/logo.png' alt="sendiit" width="300"/>
                </div>
            <div>
            <div id="nosotros">
                <h1> Nosotros </h1>
                <p>
                Somos una empresa dedicada al envío de paquetes a través de lockers, donde cada usuario podrá enviar paquetes desde la aplicación o página web a una ubicación deseada sin tener que interactuar con otras personas. Todo en menos de 24 hrs.
                </p>
               
                <h5>¡Vive la experiencia send<span className='colorRojo'>iit</span>!</h5>

            </div>
            <div id="sucursales">
                <h1>Sucursales</h1>
                <img className='img-fluid' src='/img/brand/sucursales.png' alt="mapaSucursales" width="500px"></img>
            </div>
            <div id="sucursales1"> 
                <div className="row sucursales-img">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <img  className='img-fluid' src='/img/brand/santaFe.png' alt="santaFe-sucursal" width="450px"></img>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <img   className='img-fluid' src='/img/brand/delValle.png' alt="delValle-sucursal" width="450px" ></img>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <img  className='img-fluid' src='/img/brand/coyoacan.png' alt="coyoacan-sucursal" width="450px" ></img>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12'>
                        <img   className='img-fluid' src='/img/brand/satelite.png' alt="satelite-sucursal" width="450px"></img>
                    </div>
               
                
                
                
                </div>
            </div>
               
           
            
            </div>
            
            </div>

            <div className='row'>
            <FooterLanding/>
            </div>
        </div>
    )
}