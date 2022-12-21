import React from 'react'
import { useEffect } from 'react';
import { useCardStore } from '../../hooks';
import { useUiStore } from '../../hooks/useUiStore'

export const CreditCardBox = () => {
    const { cards, setActiveCard, startLoadingCards } = useCardStore();
    const { openCreditCardModal } = useUiStore();

    // const onDoubleClick = (card) => {
    //     openCreditCardModal();
    // }
    const onSelect = (card) => {
        // console.log({ click: card });
        setActiveCard( card );
        openCreditCardModal();
    }

    useEffect(() => {
        startLoadingCards();
    }, []);
    

    return (
        <>
            {
                cards.map(card => (
                    <tr key={card._id}>
                    <th scope="row">Visa que termina en {card.cardNumber.slice(-3)}</th>
                    <td>{card.cardName}</td>
                    <td>{card.month} / {card.year}</td>
                    <td><button
                            onDoubleClick={(e) => onDoubleClick(card)}
                            onClick={(e) => { onSelect(card) }}
                        >
                            Editar
                        </button></td>
                </tr>
                ))
            }
        </>
    )
}
