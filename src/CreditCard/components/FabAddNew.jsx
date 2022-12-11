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
            className="btn btn-primary"
            onClick={handleClickNew}
        >
            <i className='fa-solid fa-plus'></i>
        </button>
    )
}
