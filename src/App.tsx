import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ShoppingList} from './ShoppingList';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
      <ShoppingList></ShoppingList>
      </header>
    </div>
  );
}

export default App;
