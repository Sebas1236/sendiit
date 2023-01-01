import { useDispatch, useSelector } from "react-redux"
import { onCloseCreditCardModal, onOpenCreditCardModal, onCloseNewUserModal, onOpenNewUserModal } from "../store";


export const useUiStore = () => {

    const dispatch = useDispatch();

    //Acceder al store
    const {
        isCreditCardModalOpen,
        isNewUserModalOpen,
    } = useSelector( state => state.ui );

    const openCreditCardModal = () => {
        dispatch( onOpenCreditCardModal() );
    }

    const closeCreditCardModal = () => {
        dispatch( onCloseCreditCardModal() );
    }

    const openNewUserModal = () => {
        dispatch( onOpenNewUserModal() );
    }

    const closeNewUserModal = () => {
        dispatch( onCloseNewUserModal() );
    }

    const toggleCreditCardModal = () => {
        (isCreditCardModalOpen)
            ? openCreditCardModal()
            : closeCreditCardModal()
    }

    return {
        //* Propiedades
        isCreditCardModalOpen,
        isNewUserModalOpen,

        //* Métodos
        closeCreditCardModal,
        openCreditCardModal,
        openNewUserModal,
        closeNewUserModal,
        closeCreditCardModal,
        toggleCreditCardModal,
    }
}