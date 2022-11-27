import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { Navbar, Footer } from '../../components';
import { useAuthStore, useForm } from '../../hooks'
import './LoginPage.css'

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
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
            <div className="container login-container">
                
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <h3>Ingreso</h3>
                        <form onSubmit = { loginSubmit }>
                            <div className="form-group mb-2">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    name = "loginEmail"
                                    value = { loginEmail }
                                    onChange = { onLoginInputChange }
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name = "loginPassword"
                                    value = { loginPassword }
                                    onChange = { onLoginInputChange }
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <input 
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login" 
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}