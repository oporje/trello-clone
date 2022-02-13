import React, { FC, useContext, useState } from 'react';
import { ListContext } from '../../context/listConext';
import { ICard, IList } from '../../models/board-models';
import CardDetails from '../card-details/card-details';
import CardPill from '../card-pill/card-pill';
import './list.css'

interface ListComponentProps {
    listItem: IList;
}

// Component responsible for showing all the cards
const List: FC<ListComponentProps> = ({ listItem: { listId, name }}) => {
    const [cardPopupVisibility, setCardPopupVisibility] = useState<boolean>(false);
    const [cardAction, setCardAction] = useState<string>('');
    const { lists, setLists } = useContext(ListContext);
    const [editCard, setEditCard] = useState<ICard>();
    const currentListItem = lists[listId];

    const handleEditCard = (card: ICard, selectedListId: string) => {
        const listItemToMoveTheCard = {...lists[selectedListId]};
        delete currentListItem.cards[card.cardId];
        setLists({
            ...lists,
            [listId]: {
                ...currentListItem,
                cards: {
                    ...currentListItem.cards,
                }
            },
            [selectedListId]: {
                ...listItemToMoveTheCard,
                cards: {
                    ...listItemToMoveTheCard.cards,
                    [card.cardId]: {
                        ...card
                    }
                }
            }
        });
    }

    const onEditClick = (editableCard: ICard) => {
        setCardAction('edit');
        setEditCard(editableCard);
        setCardPopupVisibility(true);
    }

    const onAddClick = () => {
        setCardAction('add');
        setEditCard(undefined);
        setCardPopupVisibility(true);
    }

    const handleAddCard = (card: ICard, selectedListId?: string) => {
        setLists(
            {
                ...lists,
                [listId]: {
                    ...currentListItem,
                    cards: {
                        ...currentListItem.cards,
                        [card.cardId]: {...card}
                    }
                }
            }
        )
    }

    return (
        <div className='list-container'>
            <header>
                <h2>{name}</h2>
                <div>
                    <button onClick={() => onAddClick()}>Add Card</button>
                    <CardDetails 
                        isPopupVisible={cardPopupVisibility}
                        setCardPopupVisibility={setCardPopupVisibility}
                        addCard={handleAddCard}
                        handleEditCard={handleEditCard}
                        listId={listId}
                        cardItem={editCard}
                        cardAction={cardAction}
                    />
                </div>
            </header>
            <section className='cards-section'>
                { currentListItem?.cards &&  
                    Object.keys(currentListItem.cards).map((key: string) => {
                        return currentListItem?.cards[`${key}`] && (<CardPill editClick={(editableCard) => onEditClick(editableCard)} key={key} card={currentListItem?.cards[`${key}`]} />)
                    })
                }
            </section>
        </div>
    );
}

export default List;
