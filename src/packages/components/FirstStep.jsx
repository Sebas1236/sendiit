import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import resetApi from '../../api/resetApi'
import '../../css/FirstStepPage.css'
import { useLockerStore, usePackageDeliveryStore } from '../../hooks'
import { NextButton } from './NextButton'
import { PreviousButton } from './PreviousButton'
import { Link } from 'react-router-dom';
import "./style.css"

export const FirstStep = () => {
    const { setDecrementStep, setIncrementStep, step, startSetDestinatario, destinatario } = usePackageDeliveryStore();
    const { setLockerNumber } = useLockerStore();

    const { reset, register, handleSubmit, formState: { errors }, watch, getValues } = useForm();

    const increment = () => {
        setIncrementStep();
    }

    useEffect(() => {
        if(destinatario !==null){
            reset(destinatario);
        }
    }, [destinatario])
    

    const onDestinatarioSubmit = (data) => {
        // console.log(data);
        startSetDestinatario(data);
        const tamano = data.dimensiones.substr(0, destinatario.dimensiones.indexOf(' '));
        // console.log(tamano)
        // const tamano = 'Mediano';
        setLockerNumber(tamano);
        setIncrementStep();
    }
    
    return (
        <div className="container-fluid">
            <h5 className='fw-bold text-center mt-3'>Información de envio</h5>
            <div className='formulario'>
                <form onSubmit={handleSubmit(onDestinatarioSubmit)} noValidate>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <p className='fW-700'>Datos del destinatario</p>
                        </div>
                        <div className='col-lg-6'>
                            <p className='fW-700'>Datos del paquete</p>
                        </div>
                    </div>
                    <div className='row'>
                        {/* PRIMER CAMPO: NOMBRE DEL DESTINATARIO */}
                        <div className='col-lg-6'>
                            <div className="form-group mb-2">
                                <label htmlFor="destinatario" className="form-label">*Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa el nombre del destinatario"
                                    name="destinatario"
                                    {...register('nombre', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese un nombre válido"
                                        }
                                    })}
                                />
                                {errors.nombre && <span style={{ 'color': '#f2317f' }}>{errors.nombre.message}</span>}
                            </div>
                        </div>

                        {/* CAMPOS PARA QUE SE INGRESEN LAS MEDIDAS DEL PAQUETE*/}
                        <div className='col-lg-6'>
                            <label htmlFor='dimensiones' className='form-label'>*Dimensiones (pulgadas)</label>
                            <div className='row'>
                                <select className="form-select"
                                    {...register('dimensiones', {
                                        required: {
                                            value: true,
                                            message: 'El campo no puede estar vacío'
                                        },
                                        // value: cardNumber
                                    })}>
                                    <option disabled={true} value="" style={{color: '#212e46'}}>--Dimensiones--</option>
                                    <option>Pequeño ( 4.3 x 16 x 25 )</option>
                                    <option>Mediano ( 9.5 x 16 x 25 )</option>
                                    <option>Grande ( 20 x 16 x 25 )</option>
                                </select>
                                {errors.dimensiones && <span style={{ 'color': '#f2317f' }}>{errors.dimensiones.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        {/*  CAMPO: apellido DEL DESTINATARIO */}
                        <div className='col-lg-6'>
                            <div className="form-group mb-2">
                                <label htmlFor="apellido" className="form-label">*Apellidos</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa los apellido del destinatario"
                                    name="apellido"
                                    {...register('apellido', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                                            message: "Ingrese apellido válidos"
                                        }
                                    })}
                                />
                                {errors.apellido && <span style={{ 'color': '#f2317f' }}>{errors.apellido.message}</span>}
                            </div>
                        </div>
                        {/*  CAMPO: Descripcion del paquete */}
                        <div className='col-lg-6'>
                            <div className="form-group mb-2">
                                <label htmlFor="descripcionPaquete" className="form-label">*Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa una descripción del paquete"
                                    name="descripcionPaquete"
                                    {...register('descripcionPaquete', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },

                                    })}
                                />
                                {errors.descripcionPaquete && <span style={{ 'color': '#f2317f' }}>{errors.descripcionPaquete.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        {/*  CAMPO: CORREO ELECTRONICO DEL DESTINATARIO */}
                        <div className='col-lg-6'>
                            <div className="form-group mb-2">
                                <label htmlFor="email" className="form-label">*Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="ejemplo@email.com"
                                    name="email"
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Ingrese un email válido"
                                        }
                                    })} />
                                {errors.email && <span style={{ 'color': '#f2317f' }}>{errors.email.message}</span>}
                            </div>
                        </div>



                        {/*  CAMPO: CLASIFICACION DEL PAQUETE */}
                        <div className='col-lg-6'>
                            <div className='form-group mb-2'>
                                <select
                                    className="form-select"
                                    name='clasificacion'
                                    placeholder='Clasificación'
                                    {...register('clasificacion', {
                                        required: {
                                            value: true,
                                            message: 'El campo no puede estar vacío'
                                        },
                                        // value: cardNumber
                                    })}>
                                    <option disabled={true} value="">
                                        --Clasificación--
                                    </option>
                                    <option value="No Frágil">No Frágil</option>
                                    <option value="Frágil">Frágil</option>

                                    {/* <option value="3">Three</option> */}
                                </select>
                                {errors.clasificacion && <span style={{ 'color': '#f2317f' }}>{errors.clasificacion.message}</span>}
                            </div>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className="form-group mb-2">
                                <label htmlFor="email2" className="form-label">*Confirmar correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="ejemplo@email.com"
                                    name="email2"
                                    {...register('email2', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Ingrese un email válido"
                                        }
                                    })} />
                                {errors.email2 && <span style={{ 'color': '#f2317f' }}>{errors.email2.message}</span>}
                                <br/>
                                {watch("email") !== watch("email2") &&
                                    getValues("email2") ? (

                                    <span style={{ 'color': '#f2317f' }}>Los correos electrónicos no coinciden</span>
                                ) : null}
                            </div>
                        </div>
                        {/*  CAMPO: PESO DEL PAQUETE */}
                        <div className='col-lg-6'>
                            <div className='form-group mb-2'>
                                <label htmlFor="pesoPaquete" className="form-label">*Peso del paquete (kg)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // placeholder="5552185678"
                                    name="pesoPaquete"
                                    {...register("pesoPaquete", {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        max: {
                                            value: 20,
                                            message: 'El peso máximo es de 20',
                                        },
                                        min: {
                                            value: 0,
                                            message: 'El peso mínimo es de 0',
                                        },
                                        pattern: {
                                            value: /^[+-]?([0-9]*[.])?[0-9]+$/,
                                            message: 'Ingrese un peso válido',
                                        }
                                        // value: telefono
                                    })} />
                                {errors.pesoPaquete && <span style={{ 'color': '#f2317f' }}>{errors.pesoPaquete.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {/*  CAMPO: TELEFONO DEL DESTINATARIO */}
                        <div className='col-lg-6'>
                            <div className="form-group mb-2">
                                <label htmlFor="telefono" className="form-label">*Número de teléfono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="5552185678"
                                    name="telefono"
                                    {...register("telefono", {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                            message: "Ingrese un número telefónico válido"
                                        },
                                        // value: telefono
                                    })} />
                                {errors.telefono && <span style={{ 'color': '#f2317f' }}>{errors.telefono.message}</span>}
                            </div>
                        </div>
                    </div>

                    <div className='row'>

                        {/*  CAMPO: DIRECCION DEL DESTINATARIO */}
                        <div className='col-lg-6'>
                            <div className="form-group mb-2">
                                <label htmlFor="direccion" className="form-label">*Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa dirección del destinatario"
                                    name="direccion"
                                    // \d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\
                                    {...register('direccion', {
                                        required: {
                                            value: true,
                                            message: "El campo no puede estar vacío"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9\sÀ-ÿ\u00f1\u00d1,#.'-/]*$/,
                                            message: "Ingrese una dirección válida"
                                        }
                                    })} />

                                {errors.direccion && <span style={{ 'color': '#f2317f' }}>{errors.direccion.message}</span>}

                            </div>

                        </div>

                    </div>

                    <div className='row m-auto mt-3 mb-5 p-3 me-1  justify-content-between'>
                            <div className='col-4 text-start'>
                                <PreviousButton />
                            </div>
                            <div className='col-4 text-center'>
                                <Link to="/" className='btn btn-sig2'>Cancelar</Link>
                            </div>
                            <div className='col-4 text-end'>
                                 <NextButton />
                            </div>
                {/* <NextButton/> */}
                        </div>
                </form>
            </div>
        </div>
    )
}