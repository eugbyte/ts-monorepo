import { Button, Input } from "@browser-notify-ui/components";
import React from "react";
import { DeepRequired, FieldArrayWithId, FieldError, FieldErrorsImpl, Merge, UseFormReturn } from "react-hook-form";

interface Notify {
    title: string;
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
    const { register, formState } = formHook;
    const {errors} = formState;
    const isValid = (fld: keyof Notify): boolean => {
        if (errors.notifications == null || errors.notifications[index] == null) {
            return false;
        }
        const errObj  = errors.notifications[index]  as Merge<FieldError, FieldErrorsImpl<DeepRequired<Notify>>> 
        return errObj[fld] != null
    }
    return (
        <div>
            <div className='flex flex-row items-start my-1 flex-wrap justify-end space-y-1 sm:space-y-0'>
                <div className="flex" key={field.id}>
                    <Input className="sm:w-1/3" register={register(`notifications.${index}.title`, { required: true, minLength: 1 } as const)} placeholder='Title' />
                    <Input className="sm:w-1/3" register={register(`notifications.${index}.message`, { required: true, minLength: 1 } as const)} placeholder='Message' />
                    <Input className="sm:w-1/3" inputMode="numeric" register={register(`notifications.${index}.delay`, { required: true, min: 0 })} placeholder='Delay(sec) (Optional)' />
                </div>                
                <Button className="mx-1" handleClick={handleDeleteRow.bind(null, index)}>➖</Button>
                
            </div>
            {isValid("title") &&
                <p className="text-red-600">Title is required.</p>
            }
            {isValid("message") &&
                <p className="text-red-600">Message is required.</p>
            }
            {isValid("delay") &&
                <p className="text-red-600">Delay must be greater than or equal to 0.</p>
            }
        </div>
    );
  }