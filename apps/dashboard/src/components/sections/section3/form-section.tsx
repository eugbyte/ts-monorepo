import { Button } from "@browser-notify-ui/components";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Row } from "./row";
import { FormValues } from "~/models/Notify";

interface Props {
  formHook: UseFormReturn<FormValues, any>;
}

export const FormSection: React.FC<Props> = ({ formHook }) => {
  const { control } = formHook;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "notifications", // unique name for your Field Array
  });
  const handleAddRow = () => {
    append({ title: "", message: "" });
  };
  const handleDeleteRow = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <section>
      <h1 className="text-xl text-white font-bold mt-10 text-center">
        3. Create notifications
      </h1>
      <div className="mt-2">
        <div className="flex flex-col">
          {fields.map((field, index) => (
            <div className="flex flex-col items-center" key={index}>
              <Row
                formHook={formHook}
                field={field}
                index={index}
                handleDeleteRow={handleDeleteRow}
                key={field.id}
              />
            </div>
          ))}
        </div>
        <Button className="mt-2" handleClick={handleAddRow}>
          ➕
        </Button>
      </div>
    </section>
  );
};
