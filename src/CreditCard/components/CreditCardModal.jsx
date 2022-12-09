import { useMemo } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useCardStore, useUiStore } from '../../hooks';
import { FabDelete } from './FabDelete';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
//TODO: MEJORAR SELECT
//TODO: VALIDAR NOMBRE Y NÚMERO DE TARJETA
//TODO: ARREGLAR BOTÓN CANCELAR
//Se obtiene del index.html id='root'
Modal.setAppElement('#root');

export const CreditCardModal = () => {
    const { isCreditCardModalOpen, closeCreditCardModal } = useUiStore();
    // Número, nombre, fecha de vencimiento, sendiit acepta las siguientes tarjetas de crédito y débito: 

    const { activeCard, startSavingCard } = useCardStore();

    const { reset, register, handleSubmit, formState: { errors } } = useForm(
        // {
        //     defaultValues: useMemo(() => {
        //         return activeCard
        //     }, [activeCard])
        // }
    );
    useEffect(() => {
        if (activeCard !== null) {
            // console.log(activeCard);
            reset(activeCard);
        }
    }, [activeCard]);


    const onCloseModal = () => {
        closeCreditCardModal();
    }

    const onCardSubmit = async(data) => {
        console.log(data);
        await startSavingCard( data );
        closeCreditCardModal();
        Swal.fire('Éxito', 'Se han registrado los datos', 'success');
    }

    return (
        <Modal
            isOpen={isCreditCardModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className={"modal"}
            //clase al fondo
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h6><strong>Administrar método de pago</strong></h6>
            <hr />
            <form onSubmit={handleSubmit(onCardSubmit)} className="container">
                <div className='form-group mb-2'>
                    <label>Número de tarjeta</label>
                    <input
                        className={`form-control ${errors.cardNumber && 'is-invalid'}`}
                        placeholder='Número'
                        {...register('cardNumber', {
                            required: {
                                value: true,
                                message: 'El campo no puede estar vacío'
                            },
                            // value: cardNumber
                        })} />
                    {errors.cardNumber && <span style={{ 'color': '#f2317f' }}>{errors.cardNumber.message}</span>}
                </div>
                <div className='form-group mb-2'>
                    <label>Nombre en la tarjeta</label>
                    <input
                        className='form-control'
                        placeholder='Nombre en la tarjeta'
                        {...register('cardName', {
                            required: {
                                value: true,
                                message: 'El campo no puede estar vacío'
                            },
                            // value: cardName
                        })} />
                    {errors.cardName && <span style={{ 'color': '#f2317f' }}>{errors.cardName.message}</span>}
                </div>
                <div className='form-group mb-2'>
                    <label>Fecha de vencimiento</label>

                    <select
                        {...register('month', {
                            required: {
                                value: true,
                                message: 'El campo no puede estar vacío'
                            },
                            // value: cardNumber
                        })}>
                        {errors.month && <span style={{ 'color': '#f2317f' }}>{errors.month.message}</span>}
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <select
                        {...register('year', {
                            required: {
                                value: true,
                                message: 'El campo no puede estar vacío'
                            },
                            // value: cardNumber
                        })}>
                        {errors.year && <span style={{ 'color': '#f2317f' }}>{errors.year.message}</span>}
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                        <option>2035</option>
                        <option>2036</option>
                        <option>2037</option>
                        <option>2038</option>
                        <option>2039</option>
                        <option>2040</option>
                        <option>2041</option>
                        <option>2042</option>
                    </select>
                </div>
                <hr />
                <button
                    className="btn btn-outline-primary btn-block"
                    onClick={onCloseModal}
                    type="button    "
                >
                    <i className='fa-solid fa-xmark'></i>
                    <span>Cancelar</span>
                </button>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className='fas fa-save'></i>
                    <span>Guardar</span>
                </button>
                {activeCard&& <FabDelete/>}
            </form>

        </Modal>
    )
}
