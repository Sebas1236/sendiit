import { useState } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navbar, Footer } from '../../components';
import { useAuthStore } from '../../hooks'
import { useForm } from 'react-hook-form';
import './css/EditUser.css'

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const EditUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { startLogin, errorMessage, clearErrorMessage2 } = useAuthStore();

    const [ nombreActivo, setNombre ] = useState(true)

    const [ apellidoActivo, setApellido ] = useState(true) 

    const [ telefonoActivo, setTelefono ] = useState(true) 

    const activarNombre = (event) => {
        setNombre(!nombreActivo)
    }

    const activarApellido = (event) => {
        setApellido(!apellidoActivo)
    }

    const activarTel = (event) => {
        setTelefono(!telefonoActivo)
    }

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const onCheck = (data) => {
        console.log(data);
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
                <Navbar /> 
            </div>

            <div className='container mb-5'>
            <div className="d-flex justify-content-between">
                      <h3 className="mb-5 fw-bold p-4">Mi cuenta</h3>
                      {/* <h3 className="mb-5 p-4">ID del usuario:  <p>302122</p></h3> */}
                      
            </div>
            

            <form onSubmit={handleSubmit(onCheck)}>
                <div className="form-user">
                
                <hr />  
                        <div className='row d-flex justify-content-around'>
                        <div className='col'>
                        <h4>Nombre</h4>
                        <input 
                            type="text" className="campo form-control shadow" 
                            id="floatingInput" placeholder=""
                            name="loginEmail" disabled={nombreActivo}
                            {...register("userName")}
                            /></div>
                        <div className='col align-right'>
                        <button type="button" className='editar' disabled={!nombreActivo} onClick={activarNombre}> <img src='/img/edit.png' height ="60" width="60" /></button></div>
                        </div>
                <hr />
                        <div className='row d-flex justify-content-around'>
                        <div className='col'>
                        <h4>Apellidos</h4>
                        <input 
                            type="text" className="campo form-control shadow" 
                            id="floatingInput" placeholder=""
                            name="loginEmail" disabled={apellidoActivo}
                            {...register("userName")}
                        /></div>
                        <div className='col align-right'>
                        <button type="button" className='editar' disabled={!apellidoActivo} onClick={activarApellido}> <img src='/img/edit.png' height ="60" width="60" /></button></div>
                        </div>
                        <hr />
                        <div className='row d-flex justify-content-around'>
                        <div className='col'>
                        <h4>Télefono</h4>
                        <p className="text-justify"><u></u></p>
                        <input 
                            type="text" className="campo form-control shadow" 
                            id="floatingInput" placeholder=""
                            name="loginEmail" disabled={telefonoActivo}
                            {...register("userName")}
                        /></div>
                        <div className='col align-right'>
                        <button type="button" className='editar' disabled={!telefonoActivo} onClick={activarTel}> <img src='/img/edit.png' height ="60" width="60" /></button></div>
                        </div>
                <hr />
                        <h4>Correo electrónico</h4>
                        <p className="text-justify">juan@gmail.com</p>
                </div>
                

                <div className='row'>
                                <div className='col'>
                                    <Link to="/auth/landing" className='w-100 btn btn-lg btn-gris'>Cancelar</Link>
                                </div>

                                <div className='col'>
                                <input
                                  className="w-100 btn btn-lg btn-rojo" 
                                  type="submit"
                                  value="Guardar" />
                                </div>
                                
                </div> 
                </form>       
                
            </div>
            
            
        </div>

    )
}