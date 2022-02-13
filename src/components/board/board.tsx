import React, { useState, FC } from 'react';
import { ListContext } from '../../context/listConext';
import { IBoard, IListsEntity } from '../../models/board-models';
import List from '../list/list';
import './board.css';

interface BoardComponentProps {
    board: IBoard;
}

const Board: FC<BoardComponentProps> = ({ board: { boardId, name } }) => {
    
    const [listName, setListName] = useState<string>('');
    const [lists, setLists] = useState<IListsEntity>({});
    const value = { lists, setLists };

    const handleAddList = () => {
        setListName('');
        const listId = `${Math.floor(Date.now() + Math.random())}`;
        setLists({...lists, [listId]: { name: listName, boardId, listId, cards: {} }});
    };

    return (
        <ListContext.Provider value={value}>
            <div className='board'>
                <h3>Welcome to board - <strong>  {name} </strong></h3>
                <div className='add-list-container'>
                    <input value={listName} onChange={e => setListName(e.target.value)} type='text' />
                    <button className='add-list-btn' onClick={() => handleAddList()}>
                        Add list
                    </button>
                </div>
                <div className='lists-container'>
                    {Object.keys(lists).map((key) => ( <List
                        key={key}  
                        listItem={lists[`${key}`]} 
                    ></List>))}
                </div>
            </div>
        </ListContext.Provider>
    );
}

export default Board;
