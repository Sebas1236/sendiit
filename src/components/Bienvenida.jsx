import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../hooks";

export const Bienvenida = () => {
    //TODO: CON TOKEN
    
    const { verificarUsuario, errorMessage } = useAuthStore();

    const verificarCuenta = ( event ) => {
        event.preventDefault();
        const verificationCode = window.location.pathname.split("/")[3];
        // console.log(verificationCode);
        verificarUsuario({confirmationCode: verificationCode});
    }

    useEffect(() => {
        if( errorMessage !== undefined ) {
          
          Swal.fire('Error en la verificación', errorMessage, 'error');
        }
      
      }, [errorMessage]);
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>Confirmar cuenta</strong>
                </h3>
                <form onSubmit={ verificarCuenta }>
                    <input                                     
                        type="submit"
                        className="btnSubmit"
                        value="Confirmar Cuenta" 
                    />
                </form>
            </header>
        </div>
    );
};
