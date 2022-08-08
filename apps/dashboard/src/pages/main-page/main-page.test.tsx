import React from "react";
import { render, screen } from "@testing-library/react";
import { MainPage } from "./main-page";

describe("test main page", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("'Grant permission' title should be displayed", () => {
    console.log({ navigator: global.navigator.permissions });
    render(<MainPage />);
    expect(screen.findByText(/Grant permission/i)).resolves.toBeInTheDocument();
  });

  it("Instructions to allow permission should be displayed when permission is blocked", () => {
    console.log({ navigator: global.navigator.permissions });
    global.Notification = {
      permission: "denied",
    } as any;
    render(<MainPage />);
    expect(
      screen.findByText(/You have blocked notifications from the website/i)
    ).resolves.toBeInTheDocument();
    expect(
      screen.findByText(
        /To re-enable, click on the relevant icon on the left of the address bar, and edit the settings./i
      )
    ).resolves.toBeInTheDocument();
  });
});
