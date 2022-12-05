import Swal from "sweetalert2";
import { useCardStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingCard, hasCardSelected } = useCardStore();
    const { closeCreditCardModal } = useUiStore();

    const handleDelete = async() => {
        await Swal.fire({
            title: '¿Estás seguro que deseas eliminar esta tarjeta?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: `No`,
            cancelButtonText: 'Cancelar',
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
        <button
            // fab-danger
            type="button"
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{
                display: hasCardSelected ? '':'none'
            }}
        >
            <i className='fa-solid fa-trash-alt'></i>
        </button>
    )
}
