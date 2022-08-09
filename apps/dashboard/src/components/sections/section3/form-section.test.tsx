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

describe("test dynamic form logic", () => {
  it("rows can be dynamically appended and removed", () => {
    render(<TestContainer />);
    let inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);

    const addButton = screen.getByRole("button", {
      name: /➕/i,
    });
    fireEvent.click(addButton, { bubbles: true });
    inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(4);

    const deleteButtons: HTMLElement[] = screen.getAllByRole("button", {
      name: /➖/i,
    });
    fireEvent.click(deleteButtons[1], { bubbles: true });
    inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
  });

  it("if only one row left, cannot delete that row", () => {
    render(<TestContainer />);
    let inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
    const deleteButton = screen.getByRole("button", {
      name: /➖/i,
    });
    fireEvent.click(deleteButton, { bubbles: true });
    inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(2);
  });
});
