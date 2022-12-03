import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../hooks";
import { FooterLanding } from "./FooterLanding";
import { NavbarInicio } from "./NavbarInicio";
import '../auth/pages/css/LoginPage.css'

export const Bienvenida = () => {
    //TODO: CON TOKEN

    const { verificarUsuario, errorMessage } = useAuthStore();

    const verificarCuenta = (event) => {
        event.preventDefault();
        const verificationCode = window.location.pathname.split("/")[3];
        // console.log(verificationCode);
        verificarUsuario({ confirmationCode: verificationCode });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {

            Swal.fire('Error en la verificación', errorMessage, 'error');
        }

    }, [errorMessage]);
    return (
        // <div className="container">
        //     <header className="jumbotron">
        //         <h3>
        //             <strong>Confirmar cuenta</strong>
        //         </h3>
        //         <form onSubmit={ verificarCuenta }>
        //             <input                                     
        //                 type="submit"
        //                 className="btnSubmit"
        //                 value="Confirmar Cuenta" 
        //             />
        //         </form>
        //     </header>
        // </div>
        <div className='container-fluid '>
            <div className='row'>
                <NavbarInicio />
            </div>
            <div className='row text-center '>
                <div className="form-signin w-100 m-auto">
                    <img className="mb-4" src="/img/brand/logo.png" alt="sendiit" width="250" />
                </div>
            </div>
            <div className='m-auto text-center'>
                <form onSubmit={verificarCuenta}>
                    <input
                        type="submit"
                        className="btn-rojo btn m-auto btn-lg"
                        value="Confirmar cuenta"
                    />
                </form>
            </div>



            <div className='row mt-5 altura'>

            </div>
            <div className='row'>
                <FooterLanding />
            </div>

        </div>
    );
};
