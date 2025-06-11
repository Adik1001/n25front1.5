// src/App.js
import React, { useState } from 'react';
import GameField from './components/GameField';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [userName, setUserName] = useState("");

  return (
    <div className="App">
      {userName ? (
        <GameField userName={userName} />
      ) : (
        <LoginForm onLogin={setUserName} />
      )}
    </div>
  );
}

export default App;