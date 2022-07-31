import React, { useEffect, useState } from 'react';
import { Button } from "@browser-notify-ui/components";
import { subscribe, getPermissionState } from '@browser-notify-ui/service-workers';

function App() {
  const [permission, setPermission] = useState<NotificationPermission>(getPermissionState());

/**
   * React's virtual dom diffing only updates the actual dom based on changes in the virtual dom
   * The permission API affects the windows object, not the dom, and affects the actual tree, not the virtual tree.
   * Thus, useEffect(() => {}, [Notification.permission]) does not work
   * Workaround is to use setInterval and periodically poll for the permission status
 */

  useEffect(() => {
    const id = setInterval(() => {
      setPermission(getPermissionState());
    }, 2000);
    setPermission(getPermissionState());
    return () => clearInterval(id);
  }, []);

  const handleSubscribe = async (): Promise<void> => {
    try {
      const permission: NotificationPermission = await Notification.requestPermission();
      console.log(permission)
      const res = await subscribe("fakepanda", "abc@m.com");
    } catch (err) {
      console.error(err);
    }    
  };
  const rows: JSX.Element[] = [<div className='flex flex-row'>
    <input type="text" className='w-2/3 m-1'/><input type="number" className='w-1/3 m-1'/>
  </div>];
  
  return (
    <div className='flex flex-col justify-center items-center bg-slate-800 h-screen'>
      <h1 className='text-xl text-white text-white font-bold'>1. Grant permission</h1>
      <Button className='text-white 
        p-5 m-5
        rounded 
        bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900' 
        handleClick={handleSubscribe}>Subscribe
      </Button>
      {permission === "denied" &&
        <div className='flex flex-col items-center'>
          <p className='text-white m-2'>You have blocked notifications from the website</p>
          <p className='text-white m-2'>To re-enable, click on the relevant icon on the left of the address bar, and edit the settings.</p>
          <img src="https://www.digitaltrends.com/wp-content/uploads/2020/04/google-chrome-lock.jpg?fit=720%2C480&p=1" 
            alt="img from www.digitaltrends.com"
            title="www.digitaltrends.com/computing/how-to-enable-and-disable-chrome-notifications" />
        </div>
      }
      {permission === "granted" &&
        <div className='mt-10'>
          <h1 className='text-xl text-white text-white font-bold'>2. Push notifications</h1>

          {rows}
          <Button className='text-white 
            p-2
            rounded 
            bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900' 
            handleClick={handleSubscribe}>+ Add more
          </Button>
        </div>
      }
    </div>
  );
}

export default App;
