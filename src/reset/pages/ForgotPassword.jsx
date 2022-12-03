
//TODO useForm, useEffect, 

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FooterLanding, Navbar, NavbarInicio } from "../../components";
import { useResetStore } from "../../hooks/useResetStore";

// const formFields = {
//     email: ''
// }

export const ForgotPassword = () => {

    const { startRecoverEmail, errorMessage } = useResetStore();
    // const { email, onInputChange } = useForm(formFields);
    const { handleSubmit, register, formState: { errors } } = useForm();

    const forgotPasswordSubmit = (data) => {
        console.log(data.email);
        startRecoverEmail({email: data.email});
        Swal.fire('Correo de recuperación enviado', 'Se ha enviado un link para restablecer su contraseña. Por favor, revise su correo.', 'success');
    }

    // Para estar al tanto de los cambios de errorMessage
    useEffect(() => {
        if (errorMessage !== undefined) {

            Swal.fire('Error', errorMessage, 'error');
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
                    <form onSubmit={handleSubmit(forgotPasswordSubmit)}>
                    <h3 className='fw-bold mb-5'>Recuperar contraseña</h3>
                        <div className="form-group mb-4 ">
                            <input
                                type="email"
                                className="form-control shadow w-75 m-auto "
                                placeholder="Correo"
                                name="email"
                                {...register('email', {
                                    required: true
                                })}/>
                        { errors.email?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }
                            
                        </div>
                        
                        <div className='col '>
                        
                            <input
                                className="w-75 btn btn-lg btn-rojo btn-60" 
                                type="submit"   
                                onClick={<Link to="/auth/recover-email"></Link>}
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
