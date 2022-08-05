import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("test main page", () => {
  beforeEach(() => {
    global.BroadcastChannel = jest.fn();
  });

  it("'Grant permission' title should be displayed", async () => {
    render(<App />);
    const linkElement = await screen.findByText(/Grant permission/i);
    expect(linkElement).toBeInTheDocument();
  });
});
