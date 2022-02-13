import React, { FC, useContext, useEffect, useState } from 'react';
import { ListContext } from '../../context/listConext';
import { ICard } from '../../models/board-models';
import Popup from '../popup/popup';

interface CardDetailsComponentProps {
  cardItem?: ICard;
  addCard: (card: ICard, seectedListId: string) => void;
  isPopupVisible: boolean;
  setCardPopupVisibility: (setVal: boolean) => void;
  listId: string;
  cardAction: string;
  handleEditCard: (card: ICard, selectedListId: string) => void;
}

interface ListOption {
  name: string,
  listId: string
}

// component responsible to show Card details as well as edit Card 
const CardDetails: FC<CardDetailsComponentProps> = ({cardItem, addCard, isPopupVisible, setCardPopupVisibility, listId, cardAction, handleEditCard}) => {
    const [title, setCardTitle] = useState<string>('');
    const [description, setCardDescription] = useState<string>('');

    const {lists} = useContext(ListContext);
    const defaultList = {
      listId,
      name: lists[`${listId}`].name
    }

    const [selectedList, setSelectedList] = useState<ListOption>(defaultList);

    useEffect(() => {
      if (cardItem) {
        setCardTitle(cardItem?.title);
        setCardDescription(cardItem?.description);
      }

    }, [cardItem]);

    const listOptionArray = Object.keys(lists).reduce((previousValue, currenTkey) => {
      return [
      ...previousValue,
      {
        listId: currenTkey,
        name: lists[`${currenTkey}`].name
      }]
    },[] as ListOption[])

    const handleOnSelectChange = (value: string) => {
      const selList = listOptionArray.find((list) => list.listId === value);
      if (selList) {
        setSelectedList({ listId: selList?.listId, name: selList?.name });
      }
    }

    const handleSave = () => {
      if (cardItem) {
        handleEditCard({
          title: title, 
          description: description, 
          cardId: cardItem?.cardId,
        }, selectedList.listId);
      } else {
        addCard({
          title: title, 
          description: description, 
          cardId: `${Math.floor(Date.now() + Math.random())}`,
        }, selectedList.listId);
      }
      setCardTitle('');
      setCardDescription('');
      setSelectedList(defaultList);
      setCardPopupVisibility(false);
    }

    return (
      <div className='card-container'>
        <Popup
          onClose={() => setCardPopupVisibility(false)}
          show={isPopupVisible}
          title='Add Card Details'
        >
          { (<div className='card-input-form'>
                  <div className="form-input-container">
                    <label>Title</label>
                    <input value={title} onChange={e => setCardTitle(e.target.value)}></input>
                  </div>
                  <div className="form-input-container">
                    <label>Description</label>
                    <input value={description} onChange={e => setCardDescription(e.target.value)}></input>
                  </div>
                  { cardAction === 'edit' && (<div>
                  <label>Category</label>
                    <select value={selectedList.listId} onChange={(e) => handleOnSelectChange(e.target.value)}>
                      {
                        listOptionArray.map(({listId: listIdString, name: listName}) => (<option key={listIdString} value={listIdString}>{listName}</option>))
                      }
                    </select>
                  </div>)}
                  <div className="form-button-container">
                    <button onClick={() => handleSave()}>Save</button>
                    <button onClick={() => setCardPopupVisibility(false)}>Cancel</button>
                  </div>
                </div>)
          }
        </Popup>
      </div>
    );
}

export default CardDetails;
