import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useUiStore, useUserStore } from '../../hooks';
// import { FabDelete } from './FabDelete';
import '../../CreditCard/components/CreditCardModal.css'
import { FormHeader } from '../FormHeader';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: '75%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },

};
//Se obtiene del index.html id='root'
Modal.setAppElement('#root');

export const NewUserModal = () => {
    const { isNewUserModalOpen, closeNewUserModal } = useUiStore();

    const { activeUser, startSavingUser, sendDeliveryManEmail } = useUserStore();

    const { reset, register, handleSubmit, formState: { errors }, watch, getValues } = useForm();
    useEffect(() => {
        if (activeUser !== null) {
            // console.log(activeUser);
            reset(
                {
                    activeUser, registerName: activeUser.name,
                    registerLastName: activeUser.last_name,
                    phone: activeUser.phone,
                });
        } else {
            reset({
                data: ''
            })
        }
    }, [activeUser]);


    const onCloseModal = () => {
        closeNewUserModal();
    }

    const onUserSubmit = async(data) => {
        activeUser ?
            await startSavingUser({...data, _id: activeUser._id})
            :
            await startSavingUser({...data});
        
        // sendDeliveryManEmail(data);
        //TODO: ENVIAR CORREO AL REPARTIDOR PARA QUE CREE SU CONTRASEÑA

        closeNewUserModal();
        Swal.fire('Éxito', 'Se ha registrado al repartidor.El repartidor deberá revisar su correo y crear una nueva contraseña para ingresar al sistema.', 'success');
    }

    return (
        <Modal
            isOpen={isNewUserModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className={"modal"}
            //clase al fondo
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <div className="back-color">
                <h6 className='header-text'><strong>
                    {
                        (activeUser)
                            ? "Editar repartidor"
                            : "Agregar repartidor"
                    }

                </strong></h6>
                <br /></div>
            <form onSubmit={handleSubmit(onUserSubmit)} className="container" noValidate>
                <div className='row text-center '>
                    <div className="form-signin w-100 mx-auto mt-4 mb-4">
                        {/* <FormHeader title={"Crear cuenta"} /> */}
                        <div className="form-body p-3">
                            <h5 className='text-start'>*Campos obligatorios</h5>

                            <div className="form-group mb-2">
                                <label htmlFor="registerName" className="form-label">*Nombre</label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    placeholder="Ingresa tu nombre"
                                    name="registerName"
                                    {...register('registerName', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese un nombre válido"
                                        }
                                    })} />
                                {errors.registerName && <span style={{ 'color': '#f2317f' }}>{errors.registerName.message}</span>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="registerLastName" className="form-label">*Apellidos</label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    placeholder="Ingresa tus apellidos"
                                    name="registerLastName"
                                    {...register('registerLastName', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese apellidos válidos"
                                        }
                                    })} />
                                {errors.registerLastName && <span style={{ 'color': '#f2317f' }}>{errors.registerLastName.message}</span>}
                            </div>
                            {
                                !activeUser &&
                                (
                                    <>
                                        <div className="form-group mb-2">
                                            <label htmlFor="registerEmail" className="form-label">*Correo electrónico</label>
                                            <input
                                                type="email"
                                                className="form-control shadow"
                                                placeholder="ejemplo@email.com"
                                                name="registerEmail"
                                                {...register('registerEmail', {
                                                    required: {
                                                        value: true,
                                                        message: "El campo no puede estar vacío"
                                                    },
                                                    pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: "Ingrese un email válido"
                                                    }
                                                })} />
                                            {errors.registerEmail && <span style={{ 'color': '#f2317f' }}>{errors.registerEmail.message}</span>}
                                        </div>
                                        <div className="form-group mb-2">
                                            <label htmlFor="registerEmail2" className="form-label">*Confirmar Correo electrónico</label>
                                            <input
                                                type="email"
                                                className="form-control shadow"
                                                placeholder="ejemplo@email.com"
                                                name="registerEmail2"
                                                {...register('registerEmail2', {
                                                    required: {
                                                        value: true,
                                                        message: "El campo no puede estar vacío"
                                                    },
                                                    pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: "Ingrese un email válido"
                                                    }
                                                })} />
                                            {/* {errors.registerEmail2 && <span style={{ 'color': '#f2317f' }}>{errors.registerEmail2.message}</span>}
                            <br/> */}
                                            {watch("registerEmail") !== watch("registerEmail2") &&
                                                getValues("registerEmail2") ? (

                                                <span style={{ 'color': '#f2317f' }}>Los correos electrónicos no coinciden</span>
                                            ) : null}
                                        </div>
                                    </>
                                )
                            }

                            <div className='row d-flex justify-content-around'>
                                <div className='col'>

                                    <label htmlFor="phone" className="form-label">*Teléfono</label>
                                    <input
                                        type="text" className="campo form-control shadow floatingInput"
                                        placeholder='+525534767714'
                                        // id="floatingInput" 
                                        name="phone"
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: "El campo no puede estar vacío"
                                            },
                                            pattern: {
                                                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                                message: "Ingrese un número telefónico válido"
                                            },
                                        })} />
                                    {errors.phone && <span style={{ 'color': '#f2317f' }}>{errors.phone.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className='row gap-3'>
                    <button
                        className="btn btn-gris btn-block col"
                        onClick={onCloseModal}
                        type="button"
                    >

                        <span> Cancelar</span>
                    </button>

                    {/* {activeUser && <FabDelete />} */}
                    {/* <button 
                    className="btn btn-rojo btn-block col"
                    type="button"
                > Eliminar</button> */}
                    <button
                        type="submit"
                        className="btn btn-azul btn-block col"
                    >

                        <span> Guardar</span>
                    </button>
                </div>
                {/* <div>{activeCard&& <FabDelete/>}</div> */}
            </form>

        </Modal>
    )
}
