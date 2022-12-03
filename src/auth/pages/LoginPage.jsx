import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navbar, Footer } from '../../components';
import { FooterLanding } from '../../components/FooterLanding';
import { NavbarInicio } from '../../components/NavbarInicio';
import { useAuthStore } from '../../hooks'

// import './LoginPage.css'
import './css/LoginPage.css'
import './css/NavbarLanding.css'

// const loginFormFields = {
//     loginEmail: '',
//     loginPassword: '',
// }

export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { startLogin, errorMessage } = useAuthStore();

    // const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

    const loginSubmit = (data) => {
        // console.log(data.loginEmail);
        // Swal.fire('Iniciar Sesión', 'Iniciando sesión...', 'success');
        startLogin({ email: data.loginEmail, password: data.loginPassword });
    }


    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {

            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }

    }, [errorMessage]);

    return (
        // <>
        //     <Navbar />
        //     <div className="container login-container">

        //         <div className="row">
        //             <div className="col-md-6 login-form-1">
        //                 <h3>Ingreso</h3>
        //                 <form onSubmit={ handleSubmit(loginSubmit) }>
        //                     <div className="form-group mb-2">
        //                         <input
        //                             type="text"
        //                             className="form-control"
        //                             placeholder="Correo"
        //                             name="loginEmail"
        //                             {...register('loginEmail',{
        //                                 required: true, 
        //                                 // value={loginEmail}
        //                                 // onChange={onLoginInputChange}    
        //                             })}/>

        //                         { errors.loginEmail?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }
        //                         {/* <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> */}
        //                     </div>
        //                     <div className="form-group mb-2">
        //                         <input
        //                             type="password"
        //                             className="form-control"
        //                             placeholder="Contraseña"
        //                             name="loginPassword"
        //                             {...register('loginPassword',{
        //                                 required: true,
        //                                 minLength: 6,
        //                             })}
        //                             // value={loginPassword}
        //                             // onChange={onLoginInputChange}
        //                         />
        //                         { errors.loginPassword?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }
        //                         {/* { errors.loginPassword?.type === 'minLength' && <small style={{'color': '#f2317f'}}>La contraseña debe de ser de al menos 6 caracteres</small> } */}
        //                     </div>
        //                     <div className="row mb-4">
        //                         <div className="col d-flex justify-content-center">
        //                             <div className="form-check">
        //                                 <input className="form-check-input" type="checkbox" value="" id="form2Example31" defaultChecked={true} />
        //                                 <label className="form-check-label" htmlFor="form2Example31"> Recuérdame </label>
        //                             </div>
        //                         </div>

        //                         <div className="col">
        //                             <p><Link to="/forgot-password">Recuperar Contraseña </Link></p>
        //                         </div>
        //                     </div>
        //                     <div className="d-grid gap-2">
        //                         <input
        //                             type="submit"
        //                             className="btnSubmit"
        //                             value="Login"
        //                         />
        //                     </div>
        //                     <div className="text-center">
        //                         <p>¿No tienes una cuenta? <Link to="/auth/register">Registrarse</Link></p>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        //     <Footer />
        
            <div className='container-fluid'>
                <div className='row'>
                    <NavbarInicio/> 
                </div>
              
                <div className='row text-center '>
                    <div className="form-signin w-100 m-auto">
                        <form onSubmit={handleSubmit(loginSubmit)}>
                          <img className="mb-4" src='/img/brand/logo.png' alt="sendiit" width="250"/>
                          <h1 className="h3 mb-5 fw-normal">Iniciar sesión</h1>
    
                          <div className="form-floating mb-4 ">
                            <input 
                                type="email" className="form-control shadow" 
                                id="floatingInput" placeholder="Correo electrónico"
                                name="loginEmail"
                                {...register('loginEmail',{
                                    required: true,   
                                })}/>
                                { errors.loginEmail?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }
                            <label htmlFor="floatingInput">Correo electrónico</label>
                          </div>
                          <div className="form-floating mb-4">
                            <input type="password" className="form-control shadow"
                                id="floatingPassword" placeholder="Contraseña"
                                name="loginPassword"
                                {...register('loginPassword',{
                                    required: true,
                                    minLength: 6,
                                })}/>
                                { errors.loginPassword?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }
                                { errors.loginPassword?.type === 'minLength' && <small style={{'color': '#f2317f'}}>La contraseña es de al menos 6 caracteres</small> }
                            <label htmlFor="floatingPassword">Contraseña</label>
                          </div>
    
                          <p className='mb-1'>¿Olvidaste tu contraseña?</p>
                          <p> <a href='forgot-password'>Recuperar contraseña</a>  </p>
                          
                          <div className="container-fluid">
                                <div className='row'>
                                    <div className='col'>
                                        <Link to="/auth/register" className='w-100 btn btn-lg btn-gris'>Crear cuenta</Link>
    
                                    </div>
    
                                    <div className='col'>
                                    <input
                                      className="w-100 btn btn-lg btn-rojo" 
                                      type="submit"
                                      value="Iniciar sesión" />
                                    </div>
                                </div>
                          </div>
                          
        
                        </form>
                    </div>
                </div>
                <div className='row mt-5 mb-5'>   
                </div>
                <div className='row mt-5 mb-5'>   
                </div>
    
                <div className='row mt-5'>
                    <FooterLanding />
                </div>
                
            </div>
        // </>

    )
}