import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@browser-notify-ui/components";
import { subscribe } from '@browser-notify-ui/service-workers';
import { Row } from '~/components/form';
import { usePermission } from "~/hooks";
import { useForm, useFieldArray } from "react-hook-form";

export const MainPage: React.FC = () => {
  const [permission] = usePermission();

  const handleSubscribe = async (): Promise<void> => {
    try {
      // TO DO - use faker.js to generate the info
      const res = await subscribe("fakepanda", "abc@m.com");
      console.log(res);
    } catch (err) {
      console.error(err);
    }    
  };

  const formHook = useForm({
    defaultValues: {
      "notifications": [{"message": "", "delay": ""}]
    }
  });
  const { control, register, watch } = formHook;
  const { fields, append, remove: handleDeleteRow } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "notifications", // unique name for your Field Array
  });
  
  const handleAddRow = () => {
    append({"message": "", "delay": ""});
  }

  return (
    <div className='flex flex-col justify-center items-center bg-slate-800 h-screen px-2 sm:px-0' onClick={() => console.log(watch())}>
      <h1 className='text-xl text-white font-bold'>1. Grant permission</h1>
      <Button className='mt-2' 
        handleClick={handleSubscribe}>
          {permission === "granted" ? "Subscribed ✔️" : "Subscribe"}
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
          <h1 className='text-xl text-white font-bold'>2. Push notifications</h1>
          <div className='flex flex-col flex-wrap'>
            {fields.map((field, index) => (
              <div className='flex flex-row items-start border my-1' key={index}>
                <Fragment key={field.id}>
                  <input type="text" 
                    {...register(`notifications.${index}.message`)} 
                    placeholder='Notification Message' 
                    className='w-2/3 sm:w-3/4 mx-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight'/>
                  <input type="number"
                    {...register(`notifications.${index}.delay`)} 
                    placeholder='Delay' 
                    className='w-1/3 sm:w-1/4 mx-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight'/>
                </Fragment>
                
                <Button handleClick={handleDeleteRow.bind(null, index)}> Remove </Button>
              </div>
            ))}
            
          </div>
          <Button className='mt-2' 
            handleClick={handleAddRow}>➕ Add
          </Button>
        </div>
      }
    </div>
  );
}