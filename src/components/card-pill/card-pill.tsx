import React, { FC } from 'react';
import { ICard } from '../../models/board-models';
import './card-pill.css';

interface CardPillProps {
    card: ICard;
    editClick: (card: ICard) => void;
}

const CardPill: FC<CardPillProps> = ({ card, editClick }) => {

    return (
        <div className='card-pill'>
            <header><button onClick={() => editClick(card)}>Edit</button></header>
            <div className='card-pill-details'>
                <label>Title:</label>
                <p>{ card.title }</p>
            </div>
            <div className='card-pill-details'>
                <label>Description:</label>
                <p>{ card.description} </p>
            </div>
        </div>
    );
}

export default CardPill;
