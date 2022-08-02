import { Button, Input } from "@browser-notify-ui/components";
import React from "react";
import { DeepRequired, FieldArrayWithId, FieldError, FieldErrorsImpl, Merge, UseFormReturn } from "react-hook-form";
import { Notify } from "~/models/Notify";

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
        <div className="mb-5">
            <div className='flex flex-col sm:flex-row items-end my-1 flex-wrap justify-end space-y-1 sm:space-y-0'>
                <div className="flex flex-col sm:flex-row" key={field.id}>
                    <Input className="w-full sm:w-1/3" register={register(`notifications.${index}.title`, { required: true, minLength: 1 } as const)} placeholder='Title' />
                    <Input className="w-full sm:w-1/3" register={register(`notifications.${index}.message`, { required: true, minLength: 1 } as const)} placeholder='Message' />
                    <Input className="w-full sm:w-1/3" inputMode="numeric" register={register(`notifications.${index}.delay`)} placeholder='Delay(s) - Optional' />
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