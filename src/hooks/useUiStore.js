import { useDispatch, useSelector } from "react-redux"
import { onCloseCreditCardModal, onOpenCreditCardModal } from "../store";


export const useUiStore = () => {

    const dispatch = useDispatch();

    //Acceder al store
    const {
        isCreditCardModalOpen 
    } = useSelector( state => state.ui );

    const openCreditCardModal = () => {
        dispatch( onOpenCreditCardModal() );
    }

    const closeCreditCardModal = () => {
        dispatch( onCloseCreditCardModal() );
    }

    const toggleCreditCardModal = () => {
        (isCreditCardModalOpen)
            ? openCreditCardModal()
            : closeCreditCardModal()
    }

    return {
        //* Propiedades
        isCreditCardModalOpen,

        //* Métodos
        closeCreditCardModal,
        openCreditCardModal,
        toggleCreditCardModal,
    }
}