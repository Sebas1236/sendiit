import { NavbarInicio, Footer, FooterLanding, NavbarLanding, Navbar, } from '../../components';
import './css/LoginPage.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';


export const AddPaymentMet = () =>{
    const { reset, register, handleSubmit, formState: { errors } } = useForm();

    const onCardSubmit = async(data) => {
        console.log(data);
        await startSavingCard( data );
        Swal.fire('Éxito', 'Se han registrado los datos', 'success');
    }

    return (
    <div className='container-fluid'>
    <div className='row'>
        <Navbar/> 
    </div>
  
    <div className='row text-center '>
        <div className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit(onCardSubmit)} className="text-start" noValidate>
              <h1 className="h3 mt-5 mb-4 fw-bold text-center">Agregar método de pago</h1>
                <img className="mb-2 d-flex align-items-start" src='/img/brand/cards.png' alt="sendiit" width="125"/>
                <p className='mb-2 d-flex align-items-start'>*Campos obligatorios</p>

                <div class="form-floating mb-4">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ingresa tu nombre" name="cardName"
                {...register('cardName', {
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
                {errors.cardName && <span style={{ 'color': '#f2317f' }}>{errors.cardName.message}</span>}
                <label for="floatingInput">*Nombre</label>
                </div>

                <div class="form-floating mb-4">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ingresa tu apellido" name="cardLastName"
                {...register('cardLastName', {
                    required: {
                        value: true,
                        message: "El campo no puede estar vacío"
                    },
                    pattern: {
                        value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
                        message: "Ingrese un apellido válido"
                    }
                })}
                />
                <label for="floatingInput">*Apellido</label>
                {errors.cardLastName && <span style={{ 'color': '#f2317f' }}>{errors.cardLastName.message}</span>}
                </div>

                <div class="form-floating mb-4">
                <input type="text" class="form-control" id="floatingInput" placeholder="Ingresa el número de tarjeta" name="cardNumber"
                {...register('cardNumber', {
                    required: {
                        value: true,
                        message: 'El campo no puede estar vacío'
                    },
                    pattern:{
                        value: /[0-9]{15,16}$/,
                        message: "Ingrese un número de tarjeta válido"
                    }
                })} 
                />
                <label for="floatingInput">*Número de tarjeta</label>
                {errors.cardNumber && <span style={{ 'color': '#f2317f' }}>{errors.cardNumber.message}</span>}
                </div>



                <p className='mb-1'>Fecha de vencimiento</p>
                <div className='row'>
                    <div className='col'>
                        <select class="form-select" aria-label="" 
                         {...register('month', {
                            required: {
                                value: true,
                                message: 'El campo no puede estar vacío'
                            },
                            // value: cardNumber
                        })}>
                             {errors.month && <span style={{ 'color': '#f2317f' }}>{errors.month.message}</span>}
                            <option selected disabled>Mes</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>

                    <div className='col'>
                        <select class="form-select" aria-label=""
                         {...register('year', {
                            required: {
                                value: true,
                                message: 'El campo no puede estar vacío'
                            },
                            // value: cardNumber
                        })}>
                             {errors.year && <span style={{ 'color': '#f2317f' }}>{errors.year.message}</span>}
                            <option selected disabled>Año</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2029">2030</option>
                        </select>
                    </div>
                
                </div>  
    
                                <div className='row'>
                                    <div className='col mt-5'>
                                    <Link to="/auth/LandingPage" className='w-100 btn btn-lg btn-gris'>Cancelar</Link>
                                    </div>
    
                                    <div className='col mt-5'>
                                    <input
                                      className="w-100 btn btn-lg btn-rojo" 
                                      type="submit"
                                      value="Agregar" />
                                    </div>
                                </div>
                             
            </form>
        </div>
    </div>
        <div className='row mt-5'>
            {/* <Footer /> */}
            <FooterLanding/>
        </div>
    </div>
    )
}