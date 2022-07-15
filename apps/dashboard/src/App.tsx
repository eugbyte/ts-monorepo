import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "@browser-notify-ui/components";

function App() {
  useEffect(() => {

  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <Button />
      </header>
    </div>
  );
}

export default App;
