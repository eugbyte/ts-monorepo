import React from "react";
import { render, screen } from "@testing-library/react";
import { MainPage } from "./main-page";

describe("test main page", () => {
  beforeEach(() => {
    // global.Notification = {
    //   requestPermission: function(cb?: NotificationPermissionCallback) {
    //     return Promise.resolve("granted");
    //   }
    // } as any;
    global.navigator;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("'Grant permission' title should be displayed", () => {
    console.log({ navigator: global.navigator.permissions });
    render(<MainPage />);
    expect(screen.findByText(/Grant permission/i)).resolves.toBeInTheDocument();
  });
});
