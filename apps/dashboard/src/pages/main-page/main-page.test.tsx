import React from "react";
import { render, screen } from "@testing-library/react";
import { MainPage } from "./main-page";

// jest.useFakeTimers();
// jest.spyOn(global, 'setTimeout');

describe("test main page", () => {
  it("'Grant permission' title should be displayed", () => {

    render(<MainPage />);

    expect(screen.findByText(/Grant permission/i)).resolves.toBeInTheDocument();

  });
});
