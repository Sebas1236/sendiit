import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../hooks";
import { FooterLanding } from "./FooterLanding";
import { NavbarInicio } from "./NavbarInicio";
import '../auth/pages/css/LoginPage.css'

export const Bienvenida = () => {
    //TODO: CON TOKEN


    const { verificarUsuario, errorMessage, startLogout } = useAuthStore();


    const verificarCuenta = () => {
        // event.preventDefault();
        const verificationCode = window.location.pathname.split("/")[3];
        verificarUsuario({ confirmationCode: verificationCode });
        // Swal.fire({
        //     title: 'Su cuenta ha sido verificada',
        //     // text: 'Su cuenta ha sido verificada',
        //     icon: 'success',
        //     html:
        //         '<a href="/auth/login">Iniciar Sesión</a> ',
        // })
    }

    useEffect(() => {
        if (errorMessage !== undefined) {

            Swal.fire('Error en la confirmación de cuenta', errorMessage, 'error');
        }

    }, [errorMessage]);

    useEffect(() => {
        verificarCuenta();
        startLogout();
    }, []);

    return (
        // <h3>Cuenta confirmada</h3>
        <div className='container-fluid '>
            <div className='row'>
                <NavbarInicio />
            </div>
            <div className='row mt-5 altura'>
                <div class="card text-center">
                    <div class="card-body">
                        <i class="fa-solid fa-check fa-5x"></i>
                        <br/><br/>
                        <h5 class="card-title"><strong>Cuenta verificada</strong></h5>
                        <p class="card-text">Se ha verificado su correo correctamente.</p>
                        <a href="/auth/login" class="btn btn-primary">Iniciar Sesión</a>
                    </div>
                </div>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className='row'>
                <FooterLanding />
            </div>

        </div>
    );
};
