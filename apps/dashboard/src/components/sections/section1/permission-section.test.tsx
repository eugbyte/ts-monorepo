import React from "react";
import { render, screen } from "@testing-library/react";
import { PermissionSection } from "./permission-section";

describe("test section1", () => {
  it("section1 should display instructions to unblock if permission is denied", () => {
    const permission: NotificationPermission = "denied";
    const mockHandlePermission = () => Promise.resolve();
    render(
      <PermissionSection
        permission={permission}
        handlePermission={mockHandlePermission}
      />
    );

    expect(screen.getByText("Blocked ❌")).toBeInTheDocument();
    expect(
      screen.getByText("You have blocked notifications from the website")
    ).toBeInTheDocument();
  });
});
