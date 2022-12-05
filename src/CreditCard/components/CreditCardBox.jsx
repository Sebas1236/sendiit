import React from 'react'
import { useCardStore } from '../../hooks';
import { useUiStore } from '../../hooks/useUiStore'

export const CreditCardBox = () => {
    const { cards, setActiveCard } = useCardStore();
    // console.log(cards);
    const { openCreditCardModal } = useUiStore();

    const onDoubleClick = (card) => {
        console.log({ doubleClick: card });
        openCreditCardModal();
    }

    const onSelect = (card) => {
        // console.log({ click: card });
        setActiveCard( card );
    }

    return (
        <>
            {
                cards.map(card => (
                    <div className="card" style={{ width: '18rem' }} key={card._id}>
                        <div className="card-body">
                            <h5 className="card-title">{card.cardName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{card.cardNumber}</h6>
                            <p className="card-text">{card.month}</p>
                            <a href="#" className="card-link">{card.year}</a>
                            <button
                                onDoubleClick={(e) => onDoubleClick(card)}
                                onClick={(e) => { onSelect(card) }}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
