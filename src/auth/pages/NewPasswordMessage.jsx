import {  Footer, FooterLanding, NavbarInicio } from '../../components'

export const NewPasswordMessage = () => {
    return (
        <div className='container-fluid '>
            <div className='row'>
                <NavbarInicio /> 
            </div>
            <div className='row text-center '>
                <div className="form-signin w-100 m-auto">
                <img className="mb-4" src="/img/brand/logo_sendiit-dark.png" alt="sendiit" width="250"/>
                </div>
            </div>

            <div className="card w-25 m-auto mb-4 text-center border-0" >
                <img src="/img/icons/checkmark.png" className="card-img-top w-25 m-auto" alt="..." />
                <div className="card-body ">
                    <h5 className="card-title">La contraseña se ha cambiado con exito</h5>
                    <p className="card-text"><a href='login' className='link-danger'>Inicia sesión</a> para continuar.</p>
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