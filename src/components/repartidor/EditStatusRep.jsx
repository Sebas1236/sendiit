import Swal from 'sweetalert2';
import { usePackageStore } from '../../hooks/usePackageStore';
import './EditStatusRep.css'

export const EditStatusRep = ({ paquete }) => {

    const { startHandlePackageStatus } = usePackageStore();
    const paqueteActivo = JSON.parse(window.localStorage.getItem('paqueteActivo'));
    paquete ? window.localStorage.setItem('paqueteActivo', JSON.stringify(paquete)) : paquete = paqueteActivo;

    const handleStatusChange = () => {
        let changeStatus = '';
        switch (paquete.estadoActual) {
            case 'Por recibir':
                changeStatus = 'En espera';
                break;
            case 'En espera':
                changeStatus = 'En camino';
                break;
            case 'En camino':
                changeStatus = 'En locker de destino';
                break;
            case 'En locker de destino':
                changeStatus = 'Recogido';
                break;
            case 'Recogido':
                changeStatus = 'En almacén';
                break;
            case 'En almacén':
                changeStatus = 'Desechado';
                break;

            default:
                break;
        };
        console.log(paquete.estadoActual);
        if (paquete.estadoActual !== 'Desechado' && paquete.estadoActual !== 'Recogido') {
            Swal.fire({
                title: `¿Confirmar cambio de estado a <strong style="color: #e41f1a">${changeStatus}</strong>?`,
                text: "Esta acción es irreversible!",
                imageUrl: '/img/icons/deliveryBoy.png',
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'repartidor',
                // icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Cambiar estado',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    paquete = startHandlePackageStatus(paquete._id);
                    console.log(paquete);
                    Swal.fire(
                        'Status cambiado!',
                        `El status del paquete ha cambiado a ${changeStatus}`,
                        'success'
                    )
                }
            });
        } else {
            Swal.fire({
                title: 'No es posible cambiar el status',
                text: 'El paquete ya ha sido desechado',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            })
        }

    }

    return (
        <>
            <h1 className="h3 mt-5 mb-4 fw-bold text-center">Editar estado del paquete</h1>
            <div className='d-flex justify-content-evenly'>
                <div>
                    <p className='mb-2 mb-4'><strong>Estado: </strong>{paquete.estadoActual}</p>
                    <p className='mb-2 mb-4 '><strong>ID: </strong>{paquete._id}</p>
                    <p className='mb-2 mb-4'><strong>Origen: </strong>{paquete.casilleroOrigen.ubicacion.charAt(0).toUpperCase() + paquete.casilleroOrigen.ubicacion.slice(1)}</p>
                    <p className='mb-2 mb-4'><strong>Destino: </strong>{paquete.casilleroDestino.ubicacion.charAt(0).toUpperCase() + paquete.casilleroDestino.ubicacion.slice(1)}</p>
                    <p className='mb-2 mb-4'><strong>Tamaño: </strong>{paquete.tamano}</p>
                    <p className='mb-2 mb-4'><strong>Descripción: </strong>{paquete.descripcion}</p>
                    <p className='mb-2 mb-4'><strong>Cliente remitente: </strong>{paquete.usuario.name}</p>
                    <p className='mb-2 mb-4'><strong>Cliente destinatario: </strong>{paquete.destinatario.nombre}</p>
                </div>
                <figure className='text-center'>

                    <img className="mb-2 m-auto" src='/img/qr.jpg' alt="QR" width="180" height="180" />

                    <figcaption>QR para abrir locker en espera de recolección</figcaption>
                </figure>
            </div>

            <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-rojo" onClick={handleStatusChange}>Cambiar estado</button>
            </div>
        </>
    )
}