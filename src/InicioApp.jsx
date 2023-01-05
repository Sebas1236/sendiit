// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { FooterLanding, Navbar } from "./components";
// import { useAuthStore } from "./hooks";
// import '../src/auth/pages/css/EditUser.css'
// import Swal from "sweetalert2";

// export const InicioApp = () => {

//     const { user, startLoadingUser, startUserUpdate } = useAuthStore();
//     const { uid, name, last_name, email, phone } = user;
//     //Apenas se cargue el componente se dispara el efecto
//     // console.log(user);
//     useEffect(() => {
//         startLoadingUser();
//     }, []);
//     const updateSubmit = (data) => {
        
//         let { name, last_name, phone } = data;
//         startLoadingUser({ uid });

//         startUserUpdate({ uid, name, last_name, phone });
//         Swal.fire('Éxito', 'El usuario ha sido actualizado con éxito', 'success');
//         setTimeout(() => {
//             window.location.reload(false);
//           }, 3000)
        
//     }
//     const { register, handleSubmit, formState: { errors } } = useForm(
//         {
//             defaultValues: {
//                 // name, 
//                 // last_name,
//                 // phone
//             }
//         }
//     );
//     // console.log(watch("name"));

//     const [nombreActivo, setNombre] = useState(true)

//     const [apellidoActivo, setApellido] = useState(true)

//     const [telefonoActivo, setTelefono] = useState(true)

//     const activarNombre = (event) => {
//         setNombre(!nombreActivo)
//     }

//     const activarApellido = (event) => {
//         setApellido(!apellidoActivo)
//     }

//     const activarTel = (event) => {
//         setTelefono(!telefonoActivo)
//     }

//     return (
//         <div className='container-fluid'>
//             <div className='row'>
//                 <Navbar />
//             </div>

//             <div className='container mb-5'>
//                 <div className="d-flex justify-content-between">

//                     {/* {console.log(name, last_name)} */}
//                     {/* <h3 className="mb-5 p-4">ID del usuario:  <p>{uid}</p></h3> */}
//                 </div>
//                 <h3 className="mb-5 fw-bold p-4">Cuenta de {name}</h3>

//                 <form onSubmit={handleSubmit(updateSubmit)}>
//                     <div className="form-user">

//                         <hr />
//                         <div className='row d-flex justify-content-around'>
//                             <div className='col'>
//                                 <h4>Nombre</h4>
//                                 {/* {console.log(name, last_name, phone)} */}
//                                 <input
//                                     type="text" className="campo form-control shadow floatingInput"
//                                     placeholder="" disabled={nombreActivo}
//                                     {...register('name', {
//                                         required: {
//                                             value: true,
//                                             message: "El campo no puede estar vacío"
//                                         },
//                                         pattern: {
//                                             value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
//                                             message: "Ingrese un nombre válido"
//                                         },
//                                         value: name
//                                     })} />
//                                 {errors.name && <span style={{ 'color': '#f2317f' }}>{errors.name.message}</span>}

//                             </div>
//                             <div className='col align-right'>
//                                 <button type="button" className='editar' disabled={!nombreActivo} onClick={activarNombre}> <img src='/img/edit.png' height="60" width="60" /></button></div>
//                         </div>
//                         <hr />
//                         <div className='row d-flex justify-content-around'>
//                             <div className='col'>
//                                 <h4>Apellidos</h4>
//                                 <input
//                                     type="text" className="campo form-control shadow floatingInput"
//                                     name="last_name" disabled={apellidoActivo}
//                                     {...register('last_name', {
//                                         required: {
//                                             value: true,
//                                             message: "El campo no puede estar vacío"
//                                         },
//                                         pattern: {
//                                             value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
//                                             message: "Ingrese apellidos válidos"
//                                         },
//                                         value: last_name
//                                     })} />
//                                 {errors.last_name && <span style={{ 'color': '#f2317f' }}>{errors.last_name.message}</span>}
//                             </div>
//                             <div className='col align-right'>
//                                 <button type="button" className='editar' disabled={!apellidoActivo} onClick={activarApellido}> <img src='/img/edit.png' height="60" width="60" /></button></div>
//                         </div>
//                         <hr />
//                         <div className='row d-flex justify-content-around'>
//                             <div className='col'>
//                                 <h4>Teléfono</h4>
//                                 <p className="text-justify"><u></u></p>
//                                 <input
//                                     type="text" className="campo form-control shadow floatingInput"
//                                     // id="floatingInput" 
//                                     name="phone" disabled={telefonoActivo}
//                                     {...register("phone", {
//                                         required: {
//                                             value: true,
//                                             message: "El campo no puede estar vacío"
//                                         },
//                                         pattern: {
//                                             value: /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/,
//                                             message: "Ingrese un número telefónico válido"
//                                         },
//                                         value: phone
//                                     })} />
//                                 {errors.phone && <span style={{ 'color': '#f2317f' }}>{errors.phone.message}</span>}
//                             </div>
//                             <div className='col align-right'>
//                                 <button type="button" className='editar' disabled={!telefonoActivo} onClick={activarTel}> <img src='/img/edit.png' height="60" width="60" /></button></div>
//                         </div>
//                         <hr />
//                         <h4>Correo electrónico</h4>
//                         <p className="text-justify">{email}</p>
//                     </div>


//                     <div className='row'>
//                         <div className='col'>
//                             <Link to="/auth/landing" className='w-100 btn btn-lg btn-gris'>Cancelar</Link>
//                         </div>

//                         <div className='col'>
//                                 <input
//                                     className="w-100 btn btn-lg btn-rojo"
//                                     type="submit"
//                                     value="Guardar" />
//                         </div>

//                     </div>
//                 </form>


//             </div>
//             <div className='row mt-5'>
//                 <FooterLanding />
//             </div>

//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FooterLanding, Navbar } from "./components";
import { useAuthStore } from "./hooks";
import '../src/auth/pages/css/EditUser.css'
import Swal from "sweetalert2";

export const InicioApp = () => {

    const { user, startLoadingUser, startUserUpdate } = useAuthStore();
    const { uid, name, last_name, email, phone } = user;
    //Apenas se cargue el componente se dispara el efecto
    // console.log(user);
    useEffect(() => {
        startLoadingUser();
    }, []);
    const updateSubmit = (data) => {
        let { name, last_name, phone } = data;
        startLoadingUser({ uid });

        startUserUpdate({ uid, name, last_name, phone });
        Swal.fire('Éxito', 'El usuario ha sido actualizado con éxito', 'success').then((result) => {
            location.reload();
          });
    }
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                // name, 
                // last_name,
                // phone
            }
        }
    );
    // console.log(watch("name"));

    const [nombreActivo, setNombre] = useState(true)

    const [apellidoActivo, setApellido] = useState(true)

    const [telefonoActivo, setTelefono] = useState(true)

    const [guardarActivo, setGuardar] = useState(true)

    const [cancelarActivo, setCancelar] = useState(true)

    const activarNombre = (event) => {
        setNombre(!nombreActivo)
        setGuardar(false)
        setCancelar(false)
    }

    const activarApellido = (event) => {
        setApellido(!apellidoActivo)
        setGuardar(false)
        setCancelar(false)
    }

    const activarTel = (event) => {
        setTelefono(!telefonoActivo)
        setGuardar(false)
        setCancelar(false)
    }

    const activarCampos = (event) => {
        setNombre(true)
        setApellido(true)
        setTelefono(true)
        setGuardar(true)
        setCancelar(true)
    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <Navbar />
            </div>

            <div className='container mb-5'>
                <div className="d-flex justify-content-between">
                    
                    {/* {console.log(name, last_name)} */}
                    {/* <h3 className="mb-5 p-4">ID del usuario:  <p>{uid}</p></h3> */}
                </div>
                <h3 className="mb-5 fw-bold p-4">Cuenta de {name}</h3>

                <form onSubmit={handleSubmit(updateSubmit)}>
                    <div className="form-user">

                        <hr />
                        <div className='row d-flex justify-content-around'>
                            <div className='col'>
                                <h4>Nombre</h4>
                                {console.log(name, last_name, phone)}
                                <input
                                    type="text" className="campo form-control shadow floatingInput"
                                    placeholder="" disabled={nombreActivo}
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese un nombre válido"
                                        },
                                        value: name
                                    })} />
                                {errors.name && <span style={{ 'color': '#f2317f' }}>{errors.name.message}</span>}

                            </div>
                            <div className='col align-right'>
                                <button type="button" className='editar' disabled={!nombreActivo} onClick={activarNombre}> <img src='/img/edit.png' height="60" width="60" /></button></div>
                        </div>
                        <hr />
                        <div className='row d-flex justify-content-around'>
                            <div className='col'>
                                <h4>Apellidos</h4>
                                <input
                                    type="text" className="campo form-control shadow floatingInput"
                                    name="last_name" disabled={apellidoActivo}
                                    {...register('last_name', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese apellidos válidos"
                                        },
                                        value: last_name
                                    })}/>
                                {errors.last_name && <span style={{ 'color': '#f2317f' }}>{errors.last_name.message}</span>}
                            </div>
                            <div className='col align-right'>
                                <button type="button" className='editar' disabled={!apellidoActivo} onClick={activarApellido}> <img src='/img/edit.png' height="60" width="60" /></button></div>
                        </div>
                        <hr />
                        <div className='row d-flex justify-content-around'>
                            <div className='col'>
                                <h4>Teléfono</h4>
                                <p className="text-justify"><u></u></p>
                                <input
                                    type="text" className="campo form-control shadow floatingInput"
                                    // id="floatingInput" 
                                    name="phone" disabled={telefonoActivo}
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                            message: "Ingrese un número telefónico válido"
                                        },
                                        value: phone
                                    })} />
                                {errors.phone && <span style={{ 'color': '#f2317f' }}>{errors.phone.message}</span>}
                            </div>
                            <div className='col align-right'>
                                <button type="button" className='editar' disabled={!telefonoActivo} onClick={activarTel}> <img src='/img/edit.png' height="60" width="60" /></button></div>
                        </div>
                        <hr />
                        <h4>Correo electrónico</h4>
                        <p className="text-justify">{email}</p>
                    </div>


                    <div className='row'>
                        <div className='col'>
                            <input
                                className="w-100 btn btn-lg btn-rojo"
                                type="submit"
                                value="Guardar" disabled={guardarActivo}/>
                        </div>
                        <div className='col'>
                            <input type="button" className='w-100 btn btn-lg btn-gris' 
                            disabled={cancelarActivo} onClick={activarCampos}
                            value="Cancelar"/>
                        </div>

                        

                    </div>
                </form>


            </div>
            <div className="row altura"></div>
            <div className='row mt-5'>
                <FooterLanding />
            </div>

        </div>
    )
}
