import React from "react";
import { render, screen } from "@testing-library/react";
import { MainPage } from "./main-page";

describe("test main page", () => {
  it("'Grant permission' title should be displayed", async () => {
    render(<MainPage />);
    const linkElement = await screen.findByText(/Grant permission/i);
    expect(linkElement).toBeInTheDocument();
  });
});
