import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
    formHook: UseFormReturn<any>
}

export const Row: React.FC<Props> = ({formHook}) => {
    const {register} = formHook;
    return (<div className='flex flex-row items-center'>
        <input type="text" placeholder='Notification Message' className='w-2/3 sm:w-3/4 m-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight'/>
        <input type="number"
         {...register("age", { min: 18, max: 99 })}
         placeholder='Delay' className='w-1/3 sm:w-1/4 m-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight'/>
    </div>);
  }