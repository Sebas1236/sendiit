import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FormHeader, FooterLanding, Navbar, NavbarInicio } from "../../components";
import { useResetStore } from "../../hooks/useResetStore";
// import './css/LoginPage.css'
import '../../auth/pages/css/LoginPage.css'
import { useIsFirstRender } from "../../hooks";

export const ResetPassword = () => {
    //TODO: MEJORAR
    const uid = window.location.pathname.split("/")[3];
    const token = window.location.pathname.split("/")[4];

    const { startResetPassword, errorMessage } = useResetStore();
    // const { password, password2, onInputChange } = useForm(formFields);
    const { handleSubmit, register, formState: { errors }, watch, getValues } = useForm();
    const [icon, setIcon] = useState('fa-regular fa-circle');
    const [icon2, setIcon2] = useState('fa-regular fa-circle');
    const [icon3, setIcon3] = useState('fa-regular fa-circle');
    const isFirstRender = useIsFirstRender();
    useEffect(() => {
        if (!isFirstRender) {
            {
                watch("password2") === watch("password") &&
                    getValues("password2") ? (
                    setIcon3('fa-solid fa-check')
                ) : setIcon3('fa-solid fa-xmark')
            }
        }

    });
    useEffect(() => {
        if (!isFirstRender) {
            {
                let passwordLength = getValues("password").length;
                (passwordLength < 8)
                    ?
                    setIcon('fa-solid fa-xmark')
                    :
                    setIcon('fa-solid fa-check');
            }
        }

    });
    useEffect(() => {
        if (!isFirstRender) {
            {
                let getPassword = getValues("password");
                let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,18}$/;
                (re.test(getPassword))
                    ?
                    setIcon2('fa-solid fa-check')
                    :
                    setIcon2('fa-solid fa-xmark');

            }
        }

    });

    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {

            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }

    }, [errorMessage]);


    const resetPasswordSubmit = (data) => {
        startResetPassword({ uid, token, password: data.password, password2: data.password2 });
        Swal.fire({
            title: 'Su contraseña ha sido restablecida',
            // text: 'Su cuenta ha sido verificada',
            icon: 'success',
            html:
              '<a href="/auth/login">Iniciar Sesión</a> ',
            showCloseButton: true,
            focusConfirm: false,
            
          })
    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <NavbarInicio />
            </div>

            <div className='row text-center '>
                <div className="form-signin w-100 mx-auto mt-4">
                    <form onSubmit={handleSubmit(resetPasswordSubmit)}>
                        <FormHeader title="Restablecer contraseña" />

                        <div className="form-floating mb-4 ">
                            <input
                                type="password" className="form-control shadow"
                                id="changePass" placeholder="Nueva contraseña"
                                name="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 8
                                })} />
                            {errors.password?.type === 'required' && <small style={{ 'color': '#f2317f' }}>El campo no puede estar vacío</small>}
                            {errors.password?.type === 'minLength' && <small style={{ 'color': '#f2317f' }}>Al menos 8 caracteres</small>}

                            <label htmlFor="floatingInput">Nueva contraseña</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control shadow"
                                id="changePass2"
                                placeholder="Contraseña"
                                name="password2"
                                {...register('password2', {
                                    required: true,
                                    minLength: 8
                                })} />
                            {errors.password2?.type === 'required' && <small style={{ 'color': '#f2317f' }}>El campo no puede estar vacío</small>}
                            {watch("password2") !== watch("password") &&
                                getValues("password2") ? (
                                <span style={{ 'color': '#f2317f' }}>Las contraseñas no coinciden</span>
                            ) : null}
                            <label htmlFor="changePass2">Confirmar contraseña</label>
                        </div>
                        {/* //TODO: REQUERIMIENTOS DE CONTRASEÑA */}
                        <div className="mb-4">
                            <span className="text-left">Requerimientos de contraseña</span>
                            <br />

                            <i className={icon}></i> Debe ser un mínimo de 8 caracteres.<br />
                            <i className={icon2}></i> Debe contener al menos una mayúscula, una minúscula, un dígito y un caracter especial.<br />
                            <i className={icon3}></i> Las contraseñas deben coincidir.
                            <br />
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
