import { Link } from 'react-router-dom';
import { NavbarInicio, Footer, FooterLanding } from '../../components';
import { useAuthStore, useForm } from '../../hooks'
import './css/LoginPage.css'


export const ChangePassword = () =>{
    return (
        <div className='container-fluid'>
            <div className='row'>
                <NavbarInicio /> 
            </div>
          
            <div className='row text-center '>
                <div className="form-signin w-100 mx-auto mt-4">
                    <form>
                      <img className="mb-4" src='/img/brand/logo_sendiit-dark.png' alt="sendiit" width="250"/>
                      <h1 className="h3 mb-5 fw-bold">Cambiar contraseña</h1>

                      <div className="form-floating mb-4 ">
                        <input 
                            type="password" className="form-control shadow" 
                            id="changePass2" placeholder="Nueva contraseña"
                            name="changePass1"
                            />
                        <label htmlFor="floatingInput">Nueva contraseña</label>
                      </div>
                      <div className="form-floating mb-4">
                        <input type="password" className="form-control shadow"
                            id="changePass2" placeholder="Contraseña"
                            name="changePass2"
                            />
                        <label htmlFor="changePass2">Confirmar contraseña</label>
                      </div>

                      <div className='col '>
                            <input
                                className="w-75 btn btn-lg btn-rojo btn-60" 
                                type="submit"
                                value="Actualizar contraseña" />
                        </div>
                

                    </form>
                </div>
            </div>
            
            <div className='row altura'>
               
            </div>
            <div className='row'>
                <FooterLanding />
            </div>
            
        </div>

    )
}