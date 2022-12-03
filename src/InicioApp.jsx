import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Footer, FooterLanding, Navbar, NavbarInicio } from "./components";
import { useAuthStore } from "./hooks";
import '../src/auth/pages/css/EditUser.css'

export const InicioApp = () => {

    const { user, startUpdate } = useAuthStore();
    const { name, uid, email, last_name, password, phone } = user;
    const{ register, handleSubmit, formState: { errors } } = useForm({defaultValues:{
        name, email, last_name, phone
    }});

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

    const updateSubmit = (data) => {
        const { name, email, last_name, phone} = data;
        startUpdate({uid, name, email, last_name, password, phone});
        Swal.fire('Éxito', 'El usuario ha sido actualizado con éxito', 'success');
    }

    return (
        <div className='container-fluid'>
        <div className='row'>
            <Navbar /> 
        </div>

        <div className='container mb-5'>
        <div className="d-flex justify-content-between">
                  <h3 className="mb-5 fw-bold p-4">Mi cuenta</h3>
                  {/* <h3 className="mb-5 p-4">ID del usuario:  <p>{uid}</p></h3> */}
                  
        </div>
        

        <form onSubmit={handleSubmit(updateSubmit)}>
            <div className="form-user">
            
            <hr />  
                    <div className='row d-flex justify-content-around'>
                    <div className='col'>
                    <h4>Nombre</h4>
                    <input 
                        type="text" className="campo form-control shadow" 
                        id="floatingInput" placeholder="" disabled={nombreActivo}
                        name="name" {...register('name',{
                            required: true,

                        })}
                        />
                    { errors.name?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }
                    </div>
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
                        name="last_name" disabled={apellidoActivo}
                        {...register('last_name',{
                            required: true,

                        })}
                        />
                    { errors.last_name?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }</div>
                    <div className='col align-right'>
                    <button type="button" className='editar' disabled={!apellidoActivo} onClick={activarApellido}> <img src='/img/edit.png' height ="60" width="60" /></button></div>
                    </div>
                    <hr />
                    <div className='row d-flex justify-content-around'>
                    <div className='col'>
                    <h4>Teléfono</h4>
                    <p className="text-justify"><u></u></p>
                    <input 
                        type="text" className="campo form-control shadow" 
                        id="floatingInput" placeholder=""
                        name="phone" disabled={telefonoActivo}
                        {...register("phone",{
                            required: true
                        })}/>
                        { errors.phone?.type === 'required' && <small style={{'color': '#f2317f'}}>El campo no puede estar vacío</small> }
                    </div>
                    <div className='col align-right'>
                    <button type="button" className='editar' disabled={!telefonoActivo} onClick={activarTel}> <img src='/img/edit.png' height ="60" width="60" /></button></div>
                    </div>
            <hr />
                    <h4>Correo electrónico</h4>
                    <p className="text-justify">{email}</p>
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
        <div className='row mt-5'>
                    <FooterLanding />
                </div>   
        
    </div>
    )
}
