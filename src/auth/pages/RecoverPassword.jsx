import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { NavbarInicio, Footer, FooterLanding } from '../../components'
import { useAuthStore, useForm } from '../../hooks'
import './css/LoginPage.css'

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const RecoverPassword = () => {

    const { startRegister, errorMessage } = useAuthStore();
    const { registerName, registerLastName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields );
    
    const registerSubmit = ( event ) => {
        event.preventDefault();

        startRegister({ email: registerEmail });
        Swal.fire('Correo de recuperación enviado', 'Su registro ha sido exitoso. Por favor, revise su correo.', 'success');
    }

    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if( errorMessage !== undefined ) {
              
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
          
    }, [errorMessage]);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <NavbarInicio /> 
            </div>

            <div className='row text-center '>
                <div className="form-signin w-100 m-auto">
                <img className="mb-4" src="/img/brand/logo.png" alt="sendiit" width="250"/>
                    <form onSubmit={registerSubmit}>
                    <h3 className='fw-bold mb-5'>Recuperar contraseña</h3>
                        <div className="form-group mb-4 ">
                            <input
                                type="email"
                                className="form-control shadow w-75 m-auto "
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        
                        <div className='col '>
                        
                            <input
                                className="w-75 btn btn-lg btn-rojo btn-60" 
                                type="submit"
                                value="Recuperar contraseña" />
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