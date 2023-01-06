import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FormHeader, NavbarInicio, FooterLanding } from '../../components'
import { useAuthStore, useIsFirstRender } from '../../hooks'
import './css/RegisterPage.css'

export const RegisterPage = () => {
    const [botonActivo, setBotonActivo] = useState(false);
    const { startRegister, errorMessage, clearErrorMessage2 } = useAuthStore();
    // const { registerName, registerLastName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields );
    const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm();
    const isFirstRender = useIsFirstRender();
    const registerSubmit = (data) => {
        if (data.registerPassword !== data.registerPassword2) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }
        startRegister({ email: data.registerEmail, name: data.registerName, last_name: data.registerLastName, password: data.registerPassword });
        Swal.fire('Correo de verificación enviado', 'Su registro ha sido exitoso. Por favor, revise su correo para activar su cuenta.', 'success');

    }

    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
        clearErrorMessage2();

    }, [errorMessage]);

    const [checkBoxSelected, setCheckBoxSelected] = useState(false)

    //Evento terminos y condiciones
    const handleChangeCheckBox = e => {
        let aux = !checkBoxSelected
        setCheckBoxSelected(aux)
        if (aux) {
            setBotonActivo(true)
        } else {
            setBotonActivo(false)
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <NavbarInicio />
            </div>

            <div className='row text-center '>
                <div className="form-signin w-100 mx-auto mt-4 mb-4">

                    <form onSubmit={handleSubmit(registerSubmit)} className="text-start" noValidate>
                        <FormHeader title={"Crear cuenta"} />
                        <div className="form-body p-3">
                            <h5 className='text-start'>*Campos obligatorios</h5>

                            <div className="form-group mb-2">
                                <label htmlFor="registerName" className="form-label">*Nombre</label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    placeholder="Ingresa tu nombre"
                                    name="registerName"
                                    {...register('registerName', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese un nombre válido"
                                        }
                                    })} />
                                {errors.registerName && <span style={{ 'color': '#f2317f' }}>{errors.registerName.message}</span>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="registerLastName" className="form-label">*Apellidos</label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    placeholder="Ingresa tus apellidos"
                                    name="registerLastName"
                                    {...register('registerLastName', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese apellidos válidos"
                                        }
                                    })} />
                                {errors.registerLastName && <span style={{ 'color': '#f2317f' }}>{errors.registerLastName.message}</span>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="registerEmail" className="form-label">*Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control shadow"
                                    placeholder="ejemplo@email.com"
                                    name="registerEmail"
                                    {...register('registerEmail', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Ingrese un email válido"
                                        }
                                    })} />
                                {errors.registerEmail && <span style={{ 'color': '#f2317f' }}>{errors.registerEmail.message}</span>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="registerEmail2" className="form-label">*Confirmar Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control shadow"
                                    placeholder="ejemplo@email.com"
                                    name="registerEmail2"
                                    {...register('registerEmail2', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Ingrese un email válido"
                                        }
                                    })} />
                                {/* {errors.registerEmail2 && <span style={{ 'color': '#f2317f' }}>{errors.registerEmail2.message}</span>}
                            <br/> */}
                                {watch("registerEmail") !== watch("registerEmail2") &&
                                    getValues("registerEmail2") ? (

                                    <span style={{ 'color': '#f2317f' }}>Los correos electrónicos no coinciden</span>
                                ) : null}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="registerPassword" className="form-label">*Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control shadow"
                                    placeholder="Contraseña"
                                    name="registerPassword"
                                    {...register('registerPassword', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "La contraseña debe de ser de al menos 8 caracteres"
                                        },
                                        maxLength: {
                                            value: 18,
                                            message: "La contraseña debe tener un máximo de 18 caracteres"
                                        },
                                        pattern: {
                                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,18}$/,
                                            message: "La contraseña debe tener almenos una minúscula, mayúscula, un dígito y un símbolo"
                                        }
                                    })} />
                                {errors.registerPassword && <span style={{ 'color': '#f2317f' }}>{errors.registerPassword.message}</span>}
                            </div>

                            <div className="form-group mb-2">
                                <label htmlFor="registerPassword2" className="form-label">*Confirma contraseña</label>
                                <input
                                    type="password"
                                    className="form-control shadow"
                                    placeholder="Repita la contraseña"
                                    name="registerPassword2"
                                    {...register('registerPassword2', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
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
                                    Acepto los <a href="/TerminosyCondiciones.pdf" target="_blank">Términos y condiciones</a>
                                </label>
                            </div>

                            <div className='col text-center'>
                                <input
                                    className="w-50 btn btn-lg btn-primary-c"
                                    type="submit"
                                    value="Crear cuenta" disabled={!botonActivo} />
                            </div>
                            <p className="text-center fw-bold mt-3 mb-0">¿Ya tienes una cuenta?
                                <Link to="/auth/login"><u> Iniciar Sesión</u></Link></p>

                        </div>


                    </form>
                </div>
            </div>

            <div className='row'>
                <FooterLanding />
            </div>

        </div>
    )
}
