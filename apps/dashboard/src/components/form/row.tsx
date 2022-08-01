import { Button } from "@browser-notify-ui/components";
import React from "react";
import { FieldArrayWithId, UseFormReturn, useFieldArray } from "react-hook-form";

type Field = FieldArrayWithId<{
    notifications: {
        message: string;
        delay: string;
    }[];
}, "notifications", "id">;


interface Props {
    formHook: UseFormReturn<any>;
    field: Field,
    index: number;
    handleDeleteRow: (index: number) => void;
}

export const Row: React.FC<Props> = ({formHook, field, index, handleDeleteRow}) => {
    const { register } = formHook;

    return (
        <div className='flex flex-row items-start my-1 flex-wrap justify-end space-y-1 sm:space-y-0'>
            <div className="flex" key={field.id}>
                <input type="text" 
                    {...register(`notifications.${index}.message`, { required: true, minLength: 1 })} 
                    placeholder='Notification Message' 
                    className='w-2/3 mx-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight'/>
                <input type="text"
                    inputMode="numeric" 
                    {...register(`notifications.${index}.delay`)} 
                    placeholder='Delay (Optional)' 
                    className='w-1/3 mx-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight'/>
            </div>                
            <Button className="mx-1" handleClick={handleDeleteRow.bind(null, index)}>➖</Button>
        </div>)
  }