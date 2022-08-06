import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "~/models/Notify";
import { FormSection } from "./form-section";

const TestContainer: React.FC = () => {
  const formHook = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      notifications: [{ title: "", message: "" }],
    },
  });
  return <FormSection formHook={formHook} />;
};

describe("test form section", () => {
  it("rows can be dynamically appended and removed", () => {
    render(<TestContainer />);
    let inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);

    const addButton = screen.getByRole("button", {
      name: /➕/i,
    });
    fireEvent(addButton, new MouseEvent("click", { bubbles: true }));
    inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(4);

    const deleteButton = screen.getByRole("button", {
      name: /➖/i,
    });
    fireEvent(deleteButton, new MouseEvent("click", { bubbles: true }));
    inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(4);
  });

  it("if only one row left, cannot delete", () => {
    render(<TestContainer />);
    let inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
    const deleteButton = screen.getByRole("button", {
      name: /➖/i,
    });

    fireEvent(deleteButton, new MouseEvent("click", { bubbles: true }));
    inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
  });
});
