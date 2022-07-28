import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from "@browser-notify-ui/components";
import { getPermission, subscribe } from '@browser-notify-ui/service-workers';

function App() {
  useEffect(() => {
    getPermission().catch((err) => console.error(err));
  });

  const handleClick = async (): Promise<void> => {
    try {
      const res = await subscribe("fakepanda", "abc@m.com");
      console.log(res);
    } catch (err) {
      console.error(err);
    }    
  };

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
        <Button handleClick={handleClick}>Subscribe</Button>
      </header>
    </div>
  );
}

export default App;
