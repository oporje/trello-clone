import React from 'react';
import './App.css';
import BoardContainer from './components/board-container/board-container';

function App() {
  return (
    <div className='App'>
       <p className='app-title'> Trello </p>
      <BoardContainer />
    </div>
  );
}

export default App;
