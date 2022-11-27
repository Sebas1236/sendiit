import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Navbar, Footer } from '../../components'
import { useAuthStore, useForm } from '../../hooks'
import './LoginPage.css'

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const RegisterPage = () => {

    const { startRegister, errorMessage } = useAuthStore();
    const { registerName, registerLastName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields );
    
    const registerSubmit = ( event ) => {
        event.preventDefault();
        if( registerPassword !== registerPassword2 ){
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }
        startRegister({ email: registerEmail, name: registerName, last_name: registerLastName, password: registerPassword });
        Swal.fire('Correo de verificación enviado', 'Su registro ha sido exitoso. Por favor, revise su correo.', 'success');
    }

    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if( errorMessage !== undefined ) {
              
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
          
    }, [errorMessage]);

    return (
        <>
            <Navbar/>
            <div className="col-md-6 login-form-2">
                <h3>Registro</h3>
                <form onSubmit={registerSubmit}>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            name="registerName"
                            value={registerName}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Apellidos"
                            name="registerLastName"
                            value={registerLastName}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            name="registerEmail"
                            value={registerEmail}
                            onChange={onRegisterInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="registerPassword"
                            value={registerPassword}
                            onChange={onRegisterInputChange}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña"
                            name="registerPassword2"
                            value={registerPassword2}
                            onChange={onRegisterInputChange}
                        />
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      Acepto los <a href="#!">Términos y condiciones</a>
                    </label>
                  </div>

                    <div className="d-grid gap-2">
                        <input
                            type="submit"
                            className="btnSubmit"
                            value="Crear cuenta" />
                    </div>
                    <p class="text-center text-muted mt-5 mb-0">¿Ya tienes una cuenta? 
                    <Link to="/auth/login"><u>Iniciar Sesión</u></Link></p>
                    
                </form>
            </div>
            <Footer />
        </>
    )
}
