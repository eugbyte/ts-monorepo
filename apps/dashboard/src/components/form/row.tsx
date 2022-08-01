import { Button, Input } from "@browser-notify-ui/components";
import React from "react";
import { FieldArrayWithId, UseFormReturn } from "react-hook-form";

type Notify = {
    message: string;
    delay: string;
}

type Field = FieldArrayWithId<{
    notifications: Notify[];
}, "notifications", "id">;


interface Props {
    formHook: UseFormReturn<{
        notifications: Notify[];
    }, any>;
    field: Field,
    index: number;
    handleDeleteRow: (index: number) => void;
}

export const Row: React.FC<Props> = ({formHook, field, index, handleDeleteRow}) => {
    const { register } = formHook;
    return (
        <div className='flex flex-row items-start my-1 flex-wrap justify-end space-y-1 sm:space-y-0'>
            <div className="flex" key={field.id}>
                <Input className="w-3/5" register={register(`notifications.${index}.message`, { required: true, minLength: 1 } as const)} placeholder='Notification Message' />
                <Input className="w-2/5" inputMode="numeric" register={register(`notifications.${index}.delay`, { required: true, min: 0 })} placeholder='Delay(sec) (Optional)' />
            </div>                
            <Button className="mx-1" handleClick={handleDeleteRow.bind(null, index)}>➖</Button>
        </div>
    );
  }