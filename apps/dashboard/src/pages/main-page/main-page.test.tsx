import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MainPage } from "./main-page";
import * as notifyLib from "@browser-notify-ui/service-workers";

describe("test main page", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("'Grant permission' title should be displayed", () => {
    render(<MainPage />);
    expect(screen.findByText(/Grant permission/i)).resolves.toBeInTheDocument();
  });

  it("section 2 should show when permission is granted", () => {
    global.Notification = {
      permission: "granted",
    } as any;
    render(<MainPage />);
    expect(
      screen.findByText(/You have blocked notifications from the website/i)
    ).resolves.toBeInTheDocument();
    expect(screen.findByText(/2. Subscribe/i)).resolves.toBeInTheDocument();
  });

  it("section 3 and section 4 should show when section 2 successfully subscribes", () => {
    global.Notification = {
      permission: "granted",
    } as any;
    jest.spyOn(notifyLib, "subscribe").mockResolvedValue({});
    render(<MainPage />);

    const addButton = screen.getByRole("button", {
      name: /Subscribe/i,
    });
    fireEvent(addButton, new MouseEvent("click", { bubbles: true }));
    expect(
      screen.findByText(/3. Create notifications/i)
    ).resolves.toBeInTheDocument();
    expect(screen.findByText(/4. Send!/i)).resolves.toBeInTheDocument();
  });
});
