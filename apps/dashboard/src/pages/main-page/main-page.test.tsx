import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MainPage } from "./main-page";
import * as notifyLib from "@eugbyte-ts-monorepo/service-workers";
import cloneDeep from "lodash.clonedeep";
import { act } from "react-dom/test-utils";
import { CREDENTIAL } from "~/models/enums";

const NotificationObj = cloneDeep(global.Notification);
const StorageObj = cloneDeep(global.Storage);

describe("test main page", () => {
  afterEach(() => {
    global.Notification = NotificationObj;
    global.Storage = StorageObj;
  });

  it("'Grant permission' title should be displayed", async () => {
    render(<MainPage />);
    await expect(
      screen.findByText(/Grant permission/i)
    ).resolves.toBeInTheDocument();
  });

  it("section 2 should show when permission is granted", async () => {
    global.Notification = {
      permission: "granted",
    } as any;
    render(<MainPage />);
    await expect(
      screen.findByText(/2. Subscribe/i)
    ).resolves.toBeInTheDocument();
  });

  it("section 3 and section 4 should show when section 2 successfully subscribes", async () => {
    global.Notification = {
      permission: "granted",
    } as any;
    jest.spyOn(notifyLib, "subscribe").mockResolvedValue({});
    render(<MainPage />);

    const subscribeButton = screen.getByRole("button", {
      name: /Subscribe/i,
    });
    act(() => void fireEvent.click(subscribeButton, { bubbles: true }));

    await expect(
      screen.findByText(/3. Create notifications/i)
    ).resolves.toBeInTheDocument();
    await expect(screen.findByText(/4. Send!/i)).resolves.toBeInTheDocument();
  });

  it("form validation should trigger upon submit", async () => {
    global.Notification = {
      permission: "granted",
    } as any;
    const mockStorage: Record<string, string> = {};
    mockStorage[CREDENTIAL.BROWSER_NOTIFY_UI_USERID] = "test-userID";
    mockStorage[CREDENTIAL.BROWSER_NOTIFY_UI_COMPANY] = "test-company";
    global.Storage.prototype = {
      getItem: jest.fn((key) => mockStorage[key]),
      setItem: jest.fn((key, value) => (mockStorage[key] = value)),
    } as any;
    jest.spyOn(notifyLib, "subscribe").mockResolvedValue({});
    render(<MainPage />);

    const subscribeButton = screen.getByRole("button", {
      name: /Subscribe/i,
    });
    act(() => void fireEvent.click(subscribeButton, { bubbles: true }));

    const submitButton = await screen.findByRole("button", {
      name: /Send/i,
    });
    act(() => void fireEvent.click(submitButton, { bubbles: true }));

    await expect(
      screen.findByText(/Title is required/i)
    ).resolves.toBeInTheDocument();
  });
});
