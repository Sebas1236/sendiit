import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FormHeader, FooterLanding, NavbarInicio } from "../";
import { useResetStore } from "../../hooks/useResetStore";
import '../../auth/pages/css/LoginPage.css'
import { useIsFirstRender } from "../../hooks";

export const CreatePassword = () => {
    //TODO: MEJORAR
    const token = window.location.pathname.split("/")[3];

    const { startResetPassword, errorMessage, startDeliveryManPassword } = useResetStore();
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

            Swal.fire('Error en la autenticaci??n', errorMessage, 'error');
        }

    }, [errorMessage]);


    const createPasswordSubmit = (data) => {
        // startResetPassword({ uid, token, password: data.password, password2: data.password2 });
        startDeliveryManPassword({ token, password: data.password });
        Swal.fire({
            title: 'Su contrase??a ha sido creada!',
            // text: 'Su cuenta ha sido verificada',
            icon: 'success',
            html:
              '<a href="/auth/login">Iniciar Sesi??n</a> ',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            // confirmButtonText:
            //   '<i class="fa fa-thumbs-up"></i> Genial!',
            // confirmButtonAriaLabel: 'Thumbs up, great!',
            // cancelButtonText:
            //   '<i class="fa fa-thumbs-down"></i>',
            // cancelButtonAriaLabel: 'Thumbs down'
          })
    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <NavbarInicio />
            </div>

            <div className='row text-center '>
                <div className="form-signin w-100 mx-auto mt-4">
                    <form onSubmit={handleSubmit(createPasswordSubmit)}>
                        <FormHeader title="Crear contrase??a" />

                        <div className="form-floating mb-4 ">
                            <input
                                type="password" className="form-control shadow"
                                id="changePass" placeholder="Nueva contrase??a"
                                name="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 8
                                })} />
                            {errors.password?.type === 'required' && <small style={{ 'color': '#f2317f' }}>El campo no puede estar vac??o</small>}
                            {errors.password?.type === 'minLength' && <small style={{ 'color': '#f2317f' }}>Al menos 8 caracteres</small>}

                            <label htmlFor="floatingInput">Nueva contrase??a</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input
                                type="password"
                                className="form-control shadow"
                                id="changePass2"
                                placeholder="Contrase??a"
                                name="password2"
                                {...register('password2', {
                                    required: true,
                                    minLength: 8
                                })} />
                            {errors.password2?.type === 'required' && <small style={{ 'color': '#f2317f' }}>El campo no puede estar vac??o</small>}
                            {watch("password2") !== watch("password") &&
                                getValues("password2") ? (
                                <span style={{ 'color': '#f2317f' }}>Las contrase??as no coinciden</span>
                            ) : null}
                            <label htmlFor="changePass2">Confirmar contrase??a</label>
                        </div>
                        {/* //TODO: REQUERIMIENTOS DE CONTRASE??A */}
                        <div className="mb-4">
                            <span className="text-left">Requerimientos de contrase??a</span>
                            <br />

                            <i className={icon}></i> Debe ser un m??nimo de 8 caracteres.<br />
                            <i className={icon2}></i> Debe contener al menos una may??scula, una min??scula, un d??gito y un caracter especial.<br />
                            <i className={icon3}></i> Las contrase??as deben coincidir.
                            <br />
                        </div>

                        <div className='col '>
                            <input
                                className="w-75 btn btn-lg btn-rojo btn-60"
                                type="submit"
                                value="Crear contrase??a" />
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
