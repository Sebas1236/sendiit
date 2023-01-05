import Swal from "sweetalert2";
import { useCardStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingCard, hasCardSelected } = useCardStore();
    const { closeCreditCardModal } = useUiStore();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    const handleDelete = async () => {
        await swalWithBootstrapButtons.fire({
            title: '¿Estás seguro que deseas eliminar esta tarjeta?',
            text: 'No podrás revertir esta acción!',
            icon: 'warning',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, elimínala!',
            // denyButtonText: `No`,
            cancelButtonText: 'No, cancelar!',
            // reverseButtons: true,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                startDeletingCard();
                Swal.fire('Tarjeta eliminada!', '', 'success');
                closeCreditCardModal();
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios', '', 'info')
            }
        });

    };

    return (
        // <button
        //     // fab-danger
        //     type="button"
        //     className="btn btn-danger fab-danger"
        //     onClick={handleDelete}
        //     style={{
        //         display: hasCardSelected ? '':'none'
        //     }}
        // >
        //     <i className='fa-solid fa-trash-alt'></i>
        // </button>
        <button
            className="btn btn-azul btn-block col"
            type="button"
            onClick={handleDelete}
            style={{
                display: hasCardSelected ? '' : 'none'
            }}
        > Eliminar</button>
    )
}
