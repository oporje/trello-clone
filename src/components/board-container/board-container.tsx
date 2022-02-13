import React, { useState, FC } from 'react';
import { IBoard } from '../../models/board-models';
import Board from '../board/board';
import './board-container.css';

const BoardContainer: FC = () => {
    const [board, setBoard] = useState<IBoard | null>(null);
    const [boardName, setBoardName] = useState<string>('');
    
    // for assignment lets consider user can only create one board
    const handleAddBoard = () => {
        if (!boardName) return;
        setBoard({
            name: boardName, 
            boardId: `${Math.floor(Date.now() + Math.random())}` // can be easily made dynamic
        });
    };
    return (
        <div className='board-container'>
            {!board 
                ? ( 
                    <div className='board-add-section'>
                        <input value={boardName} onChange={e => setBoardName(e.target.value)}  type='text' />
                        <button className='add-board-button' onClick={handleAddBoard}> Add Board </button>
                    </div>
                  )
                : (
                    <div className='board-list-container'>
                        <Board board={board} />
                    </div> 
                  )
            }
        </div>
    );
}

export default BoardContainer;
