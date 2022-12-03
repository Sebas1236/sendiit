import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Navbar, Footer, NavbarInicio, FooterLanding } from '../../components'
import { useAuthStore } from '../../hooks'
import './css/RegisterPage.css'

// const registerFormFields = {
//     registerName: '',
//     registerLastName: '',
//     registerEmail: '',
//     registerPassword: '',
//     registerPassword2: '',
// }

export const RegisterPage = () => {
    const [ botonActivo, setBotonActivo] = useState(false);
    const { startRegister, errorMessage } = useAuthStore();
    // const { registerName, registerLastName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields );
    const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm();

    const registerSubmit = (data) => {
        if (data.registerPassword !== data.registerPassword2) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }
        startRegister({ email: data.registerEmail, name: data.registerName, last_name: data.registerLastName, password: data.registerPassword });
        Swal.fire('Correo de verificación enviado', 'Su registro ha sido exitoso. Por favor, revise su correo.', 'success');

    }

    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }

    }, [errorMessage]);

    const [checkBoxSelected, setCheckBoxSelected] = useState(false)

    //Evento terminos y condiciones
    const handleChangeCheckBox  = e => {
        let aux = !checkBoxSelected
        setCheckBoxSelected(aux)
        if (aux){
            setBotonActivo(true)
        }else{
            setBotonActivo(false)
        }
    }

    return (
        // <>
        //     <Navbar />
        //     <div className="col-md-6 login-form-2">
        //         <h3>Registro</h3>
        //         <form onSubmit={handleSubmit(registerSubmit)}>
        //             <div className="form-group mb-2">
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     placeholder="Nombre"
        //                     name="registerName"
        //                     {...register('registerName', {
        //                         required: {
        //                             value: true,
        //                             message: "El campo no puede estar vacío"
        //                         }
        //                     })} />
        //                 {errors.registerName && <small style={{ 'color': '#f2317f' }}>{errors.registerName.message}</small>}
        //             </div>
        //             <div className="form-group mb-2">
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     placeholder="Apellidos"
        //                     name="registerLastName"
        //                     {...register('registerLastName', {
        //                         required: {
        //                             value: true,
        //                             message: "El campo no puede estar vacío"
        //                         }
        //                     })} />
        //                 {errors.registerLastName && <small style={{ 'color': '#f2317f' }}>{errors.registerLastName.message}</small>}
        //             </div>
        //             <div className="form-group mb-2">
        //                 <input
        //                     type="email"
        //                     className="form-control"
        //                     placeholder="Correo"
        //                     name="registerEmail"
        //                     {...register('registerEmail', {
        //                         required: {
        //                             value: true,
        //                             message: "El campo no puede estar vacío"
        //                         }
        //                     })} />
        //                 {errors.registerEmail && <small style={{ 'color': '#f2317f' }}>{errors.registerEmail.message}</small>}
        //             </div>
        //             <div className="form-group mb-2">
        //                 <input
        //                     type="password"
        //                     className="form-control"
        //                     placeholder="Contraseña"
        //                     name="registerPassword"
        //                     {...register('registerPassword', {
        //                         required: {
        //                             value: true,
        //                             message: "El campo no puede estar vacío"
        //                         }
        //                     })} />
        //                 {errors.registerPassword && <small style={{ 'color': '#f2317f' }}>{errors.registerPassword.message}</small>}
        //             </div>

        //             <div className="form-group mb-2">
        //                 <input
        //                     type="password"
        //                     className="form-control"
        //                     placeholder="Repita la contraseña"
        //                     name="registerPassword2"
        //                     {...register('registerPassword2', {
        //                         required: {
        //                             value: true,
        //                             message: "El campo no puede estar vacío"
        //                         },
        //                     })} />
        //                 {errors.registerPassword2 && <small style={{ 'color': '#f2317f' }}>{errors.registerPassword2.message}</small>}

        //                 {watch("registerPassword2") !== watch("registerPassword") &&
        //                     getValues("registerPassword2") ? (
        //                     <small style={{ 'color': '#f2317f' }}>Las contraseñas no coinciden</small>
        //                 ) : null}
        //                 {/* { errors.registerPassword2 && <span style={{'color': '#f2317f'}}> { errors.registerPassword2.message }</span> } */}

        //             </div>

        //             <div className="form-check d-flex justify-content-center mb-5">
        //                 <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
        //                 <label className="form-check-label" htmlFor="form2Example3">
        //                     Acepto los <a href="#!">Términos y condiciones</a>
        //                 </label>
        //             </div>

        //             <div className="d-grid gap-2">
        //                 <input
        //                     type="submit"
        //                     className="btnSubmit"
        //                     value="Crear cuenta" />
        //             </div>
        //             <p className="text-center text-muted mt-5 mb-0">¿Ya tienes una cuenta?
        //                 <Link to="/auth/login"><u>Iniciar Sesión</u></Link></p>

        //         </form>
        //     </div>
        //     <Footer />
        // </>
        <div className='container-fluid'>
        <div className='row'>
            <NavbarInicio /> 
        </div>

        <div className='row text-center '>
            <div className="form-signin w-100 m-auto">
            <img className="mb-4" src='/img/brand/logo.png' alt="sendiit" width="300"/>
            <h2 className='fw-bold mb-4'>Crear cuenta</h2>
            <h5 className='text-start'>*Campos obligatorios</h5>
                <form onSubmit={handleSubmit(registerSubmit)} className="text-start">
                
                
                    <div className="form-group mb-2">
                        <label htmlFor="registerName" className="form-label">*Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tu nombre"
                            name="registerName"
                            {...register('registerName', {
                                required: {
                                    value: true,
                                    message: "El campo no puede estar vacío"
                                },
                                pattern: {
                                    value: '/^([a-zA-Z][ ]?)+$/',
                                    message: "Ingrese un nombre válido"
                                }
                            })} />
                            {errors.registerName && <span style={{ 'color': '#f2317f' }}>{errors.registerName.message}</span>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="registerLastName" className="form-label">*Apellidos</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tus apellidos"
                            name="registerLastName"
                            {...register('registerLastName', {
                                required: {
                                    value: true,
                                    message: "El campo no puede estar vacío"
                                }
                            })} />
                            {errors.registerLastName && <span style={{ 'color': '#f2317f' }}>{errors.registerLastName.message}</span>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="registerEmail" className="form-label">*Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="ejemplo@email.com"
                            name="registerEmail"
                            {...register('registerEmail', {
                                required: {
                                    value: true,
                                    message: "El campo no puede estar vacío"
                                }
                            })} />
                            {errors.registerEmail && <span style={{ 'color': '#f2317f' }}>{errors.registerEmail.message}</span>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="registerPassword" className="form-label">*Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="registerPassword"
                            {...register('registerPassword', {
                                required: {
                                    value: true,
                                    message: "El campo no puede estar vacío"
                                },
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe de ser de al menos 6 caracteres"
                                },
                                maxLength: {
                                    value: 15,
                                    message: "La contraseña debe tener un máximo de 15 caracteres"
                                }
                            })} />
                        {errors.registerPassword && <span style={{ 'color': '#f2317f' }}>{errors.registerPassword.message}</span>}
                        
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="registerPassword2" className="form-label">*Confirma contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repita la contraseña"
                            name="registerPassword2"
                            {...register('registerPassword2', {
                                required: {
                                    value: true,
                                    message: "El campo no puede estar vacío"
                                },
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe de ser de al menos 6 caracteres"
                                },
                                maxLength: {
                                    value: 15,
                                    message: "La contraseña debe tener un máximo de 15 caracteres"
                                }
                            })} />
                        {errors.registerPassword2 && <span style={{ 'color': '#f2317f' }}>{errors.registerPassword2.message}</span>}

                        {watch("registerPassword2") !== watch("registerPassword") &&
                            getValues("registerPassword2") ? (
                            <span style={{ 'color': '#f2317f' }}>Las contraseñas no coinciden</span>
                        ) : null}
                        {/* { errors.registerPassword2 && <span style={{'color': '#f2317f'}}> { errors.registerPassword2.message }</span> } */}
                    </div>

                    <div className="form-check d-flex justify-content-center mb-3">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" onChange={handleChangeCheckBox} />
                        <label className="form-check-label" htmlFor="form2Example3">
                        Acepto los <a href="#!">Términos y condiciones</a>
                        </label>
                    </div>

                    <div className='col text-center'>
                            <input
                              className="w-50 btn btn-lg btn-rojo" 
                              type="submit"
                              value="Crear cuenta" disabled={!botonActivo} />
                    </div>
                    <p className="text-center fw-bold mt-3 mb-0">¿Ya tienes una cuenta?
                    <Link to="/auth/login"><u> Iniciar Sesión</u></Link></p>
                    
                </form>
            </div>
        </div>

        <div className='row'>
            <FooterLanding />
        </div>
        
    </div>
    )
}
