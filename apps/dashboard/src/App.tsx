import React, { useEffect } from 'react';
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
    <div className='flex justify-center items-center bg-slate-800 h-screen'>
      <Button className='text-white bg-indigo-700 p-5 ' handleClick={handleClick}>Subscribe</Button>
    </div>
  );
}

export default App;
