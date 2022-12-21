import { useCardStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    const { openCreditCardModal } = useUiStore();
    const { setActiveCard } = useCardStore();

    const handleClickNew = () => {
        // setActiveCard({
        //     cardName: '',
        //     cardNumber: '',
        //     month: 10,
        //     year: 2023,
        //     bgColor: '#fafafb',
        //     user: {
        //         _id: '1234',
        //         name: 'Sebast'
        //     }
        // });
        setActiveCard(null);
        //Limpiar nota anterior
        openCreditCardModal();
    }

    return (
        <button
            className="btn btn-primary bg-transparent text-body text-decoration-underline border-0"
            onClick={handleClickNew}
        >
            <img src="/img/icons/creditCardHand.png" alt="..." width="60px" height=""/>Agregar una tarjeta de crédito o débito
        </button>
    )
}
