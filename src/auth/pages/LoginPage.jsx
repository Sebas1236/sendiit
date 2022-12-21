import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import {FormHeader, FooterLanding, NavbarInicio } from '../../components';
import { useAuthStore } from '../../hooks'

// import './LoginPage.css'
//import './css/LoginPage.css'
//import './css/NavbarLanding.css'

export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { startLogin, errorMessage, clearErrorMessage2 } = useAuthStore();

    const loginSubmit = (data) => {
        // console.log(data.loginEmail);
        // Swal.fire('Iniciar Sesión', 'Iniciando sesión...', 'success');
        startLogin({ email: data.loginEmail, password: data.loginPassword });

				if (errorMessage !== undefined) {

					Swal.fire('Error en la autenticación', errorMessage, 'error');
				}
    }


    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {

            Swal.fire('Error en la autenticación', errorMessage, 'error');

						clearErrorMessage2();
        }

    }, [errorMessage]);

    return (

            <div className='container-fluid'>
                <div className='row'>
                    <NavbarInicio/> 
                </div>
              
                <div className='row'>
                    <div className="form-signin w-100 mx-auto mt-4">
												
                        <form onSubmit={handleSubmit(loginSubmit)} noValidate>
													<FormHeader  title={"Iniciar sesión"}/>
													<div className="form-body p-3">
														<div className="form-floating mb-4 ">
															<input 
																	type="email" className="form-control shadow" 
																	id="floatingInput" placeholder="Correo electrónico"
																	name="loginEmail"
																	{...register('loginEmail',{
																			required: {
																					value: true,
																					message: 'El campo no puede estar vacío'
																			},
																			pattern: {
																					value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
																					message: "Ingrese un email válido"
																			}
																	})}/>
															{errors.loginEmail && <span className='error'>{errors.loginEmail.message}</span>}
															<label htmlFor="floatingInput">Correo electrónico</label>
														</div>
														<div className="form-floating mb-4">
															<input type="password" className="form-control shadow"
																	id="floatingPassword" placeholder="Contraseña"
																	name="loginPassword"
																	{...register('loginPassword',{
																			required: {
																					value: true,
																					message: 'El campo no puede estar vacío'
																			},
																			minLength: {
																					value: 8,
																					message: 'La contraseña debe de ser de al menos 8 caracteres'
																			},
																			maxLength: {
																					value: 18,
																					message: "La contraseña debe tener un máximo de 18 caracteres"
																			},
																			// pattern: {
																			//     value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,18}$/,
																			//     message: "La contraseña debe tener almenos una minúscula, mayúscula, un dígito y un símbolo"
																			// }
																	})}/>
															{errors.loginPassword && <span className='error'>{errors.loginPassword.message}</span>}
															<label htmlFor="floatingPassword">Contraseña</label>
														</div>
			
														<p className='mb-1 text-center'>¿Olvidaste tu contraseña?</p>
														<p className='text-center'> <a href='forgot-password'>Recuperar contraseña</a>  </p>
														
														<div className="container-fluid mt-4">
																	<div className='row'>
																			<div className='col'>
																			<input
																				className="w-100 btn btn-lg btn-primary-c" 
																				type="submit"
																				value="Iniciar sesión" />
																			</div>
																			<div className='col'>
																					<Link to="/auth/register" className='w-100 btn btn-lg btn-secondary'>Crear cuenta</Link>
			
																			</div>
			
																	</div>
														</div>
                          
													</div>
                        </form>
                    </div>
                </div>
    
                <div className='row mt-5'>
                    <FooterLanding />
                </div>
                
            </div>
        // </>

    )
}